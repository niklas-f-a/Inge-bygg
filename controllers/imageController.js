const fs = require('fs')
const path = require('path')
const {ImageError, Forbidden, ResourceNotFound} = require('../error')
const Task = require('../models/Tasks')

module.exports = {
  async addImage(req, res, next){
    try{
      const task = await Task.findById(req.params.id)
      if(!task){
        throw new ResourceNotFound('Task')
      }
      if(task.worker != req.user.id){
        throw new Forbidden()
      }
      if(!req.files.imgFile.mimetype.startsWith('image/')){
        throw new ImageError(400, 'Must be of type image')
      }
      if(fs.existsSync(path.join('assets', 'images', req.files.imgFile.name))){
        throw new ImageError(500, 'Image Already exists')
      }else{
        fs.copyFileSync(req.files.imgFile.tempFilePath, path.join('assets', 'images', req.files.imgFile.name))
        res.status(200).json({message: "Image uploaded successfully"})
      }
    }catch(error){
      next(error)
    }

  }
}