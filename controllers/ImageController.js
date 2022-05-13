const fs = require('fs')
const path = require('path')
const {ImageError, Forbidden, ResourceNotFound} = require('../error')
const Task = require('../models/Tasks')

module.exports = {
  async addImage(req, res, next){
    try{
      const {imgFile} = req.files
      const uploadPath = path.join('assets', 'images', imgFile.name)
      const task = await Task.findById(req.params.id)

      if(!task){
        throw new ResourceNotFound('Task')
      }
      if(task.worker != req.user.id){
        throw new Forbidden()
      }
      if(!imgFile.mimetype.startsWith('image/')){
        throw new ImageError(400, 'Must be of type image')
      }
      if(fs.existsSync(uploadPath)){
        throw new ImageError(500, 'Image Already exists')
      }else{
        imgFile.mv(uploadPath, error => {
          task.imageLink = imgFile.name
          task.save()
          if(error){
            throw new ImageError(500, 'File not uploaded')
          }else{
            res.status(200).json({message: "Image uploaded successfully"})
          }
        })
      }
    }catch(error){
      next(error)
    }
  },

  async getImage(req, res, next){
    try{
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new ResourceNotFound('Task')
      }
      if(task.worker != req.user.id ||
          task.client != req.user.id ||
          req.user.role != 'admin'){
        throw new Forbidden()
      }

      const imgPath = path.join('assets', 'images', task.imageLink)
      if(!fs.existsSync(imgPath)){
        throw new ImageError(404, 'Image not found')
      }

      res.sendFile(path.resolve(imgPath))
    }catch(error){
      next(error)
    }
  },

  async deleteImage(req, res, next){
    try{
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new ResourceNotFound('Task')
      }
      if(task.imageLink.length < 1){
        throw new ImageError(404, 'Task has no image')
      }
      fs.unlinkSync(path.join('assets', 'images', task.imageLink))
      task.imageLink = ''
      task.save()
      res.status(200).json({message: 'Image deleted'})
    }catch(error){
      next(error)
    }
  }
}
