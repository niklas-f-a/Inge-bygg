const Validator = require('./Validator')


const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const minPasswordLength = 6
const minNameLength = 2
const minEmailLength = 5
const roleEnum = ['client', 'worker']



module.exports = {

  addImage(req, res, next){
    const validate = new Validator()
    validate.exist('image', req.files?.imgFile)
    if(validate.error()){
      res.json({message: validate.errorMessages})
    }else{
      next()
    }
  },

  addMessage(req, res, next){
    const validate = new Validator()
    const {content} = req.body
    validate.exist('content', content)
    if(validate.error()){
      res.json({message: validate.errorMessages})
    }else{
      next()
    }
  },

  handleTask(req, res, next){
    const validate = new Validator()
    const {task, clientId, workerId} = req.body
    validate.exist('Task', task)
            .exist('Client id', clientId)
            .exist('Worker id', workerId)

    if(validate.error()){
      res.json({message: validate.errorMessages})
    }else{
      next()
    }
  },

  register(req, res, next){
    const validate = new Validator()
    const {name, email, password, role} = req.body
    validate.charactersOf('Email', email, emailRegex).lengthOf('Email', email, minEmailLength)
            .lengthOf('Name', name, minNameLength)
            .lengthOf('Password', password, minPasswordLength)
            .checkEnum('Role', roleEnum, role)
    if(validate.error()){
      res.json({message: validate.errorMessages})
    }else{
      next()
    }
  },

  login(req, res, next){
    const validate = new Validator()
    const {email, password} = req.body
    validate.charactersOf('Email', email, emailRegex).lengthOf('Email', email, minEmailLength)
            .lengthOf('Password', password, minPasswordLength)

    if(validate.error()){
      res.json({message: validate.errorMessages})
    }else{
      next()
    }
  }


}