const Validator = require('./Validator')


const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const minPasswordLength = 6
const minNameLength = 2
const minEmailLength = 2
const roleEnum = ['client', 'worker']



module.exports = {

  addImage(req, res, next){
    const validate = new Validator()
    validate.exist('image', req.files?.imgFile)
    const error = validate.error()
    if(error){
      res.json({message: error})
    }else{
      next()
    }
  },

  addMessage(req, res, next){
    const validate = new Validator()
    const {content} = req.body
    validate.exist('content', content)
    const error = validate.error()
    if(error){
      res.json({message: error})
    }else{
      next()
    }
  },

  handleTask(req, res, next){
    const {task, clientId, workerId} = req.body
    const message = []
    if(!task){
      message.push('Task is missing')
    }
    if(!clientId){
      message.push('Missing a client')
    }
    if(!workerId){
      message.push('Missing a worker')
    }
    if(message.length > 0){
      res.json({message})
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
    const error = validate.error()
    if(error){
      res.json({message: error})
    }else{
      next()
    }
  },

  login(req, res, next){
    const {email, password} = req.body
    const message = []
    // const emailIsValid = validateEmail(email)
    // if(!email || email.length < 3 || emailIsValid == null){
    //   message.push('Not a Valid Email')
    // }
    if(!password || password.length <= minPasswordLength){
      message.push('password needs a minimum of 6 characters')
    }
    if(message.length > 0){
      res.json({message})
    }else{
      next()
    }
  }


}