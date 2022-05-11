

class Validator{
  constructor(){
    this.errorMessages = []
  }

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

  error(){
    if(this.errorMessages.length > 0){
      return true
    }else{
      return false
    }
  }

}


module.exports = Validator