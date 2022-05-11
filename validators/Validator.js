

class Validator{
  constructor(){
    // this.role = role
    // this.email = email
    // this.password = password
    // this.name = name
    this.errorMessages = []
    // this.VALIDROLES = ['client', 'worker']
  }


  // emailCheck(length){
  //   const validCharacters = this.emailValid()
  //   if(!this.email || this.email.length < length){
  //     this.errorMessages.push(`email needs minimum ${length} characters`)
  //     return this
  //   }
  //   if(validCharacters == null){
  //     this.errorMessages.push('Not a valid email')
  //   }
  //   return this
  // }
  exist(type, el){
    if(!el) {
      this.errorMessages.push(`${type} missing`)
    }
    return this
  }

  checkEnum(type, array, string){
    if(!string || !array.includes(string)){
      this.errorMessages.push(`${type} must be either ${array.map(i => i).join(' or ')}`)
    }
    return this
  }

  lengthOf(type, string, length){
    if(!string || !string.length > length){
      this.errorMessages.push(`${type} needs to be a minimum of ${length} characters`)
    }
    return this
  }

  charactersOf(type, string, regex){
    const valid = String(string)
                    .toLocaleLowerCase()
                    .match(regex)
    if(valid == null) this.errorMessages.push(`Characters are not valid for ${type}`)

    return this
  }

  // nameCheck(length){
  //   if(!this.name || this.name.length < length){
  //     this.errorMessages.push('Missing a name')
  //   }
  //   return this
  // }

  // passwordCheck(length){
  //   if(!this.password || this.password < length){
  //     this.errorMessages.push(`password needs a minimum of ${length} characters`)
  //   }
  //   return this
  // }

  // roleCheck(){
  //   if(!this.role || !this.VALIDROLES.includes(this.role)){
  //     this.errorMessages.push(`Role must be either ${this.VALIDROLES.map(role => role).join(' or ')}`)
  //   }
  //   return this
  // }

  error(){
    if(this.errorMessages.length > 0){
      return this.errorMessages
    }else{
      return false
    }
  }

}


module.exports = Validator