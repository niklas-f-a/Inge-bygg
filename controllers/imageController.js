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
      if(task.worker != req.user.id && req.user.role != 'admin'){
        throw new Forbidden()
      }
      if(!imgFile.mimetype.startsWith('image/')){
        throw new ImageError(400, 'Must be of type image')
      }
      if(fs.existsSync(uploadPath)){
        throw new ImageError(500, 'Image Already exists')
      }else{
        imgFile.mv(uploadPath, error => {
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

  }
}