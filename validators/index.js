const minPasswordLength = 6
const VALIDROLES = ['client', 'worker']

const validateEmail = (email) => {
  return String(email)
          .toLocaleLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
}


module.exports = {

  addImage(req, res, next){
    if(!req.files?.imgFile){
      res.json({message: 'Missing Image'})
    }else{
      next()
    }
  },

  addMessage(req, res, next){
    const {content} = req.body
    if(!content){
      res.json({message: "You need to add some content"})
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
    const {name, email, password, role} = req.body
    const message = []
    const emailIsValid = validateEmail(email)
    if(!name || name.length < 2){
      message.push('Missing a name')
    }
    if(!email || email.length < 3 || emailIsValid == null){
      message.push('Not a valid email')
    }
    if(!password || password.length <= minPasswordLength){
      message.push('password needs a minimum of 6 characters')
    }
    if(!role || !VALIDROLES.includes(role)){
      message.push('Role must be either worker or client')
    }
    if(message.length > 0){
      res.json({message})
    }else{
      next()
    }
  },

  login(req, res, next){
    const {email, password} = req.body
    const message = []
    const emailIsValid = validateEmail(email)
    if(!email || email.length < 3 || emailIsValid == null){
      message.push('Not a Valid Email')
    }
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