class UsersMemory {
    constructor () {
      this.users = []
    }
  
    getAll () {
      return this.users
    }
  
    get (id) {
      const user = this.users.find(user => user.id === id)
  
      return user
    }
  
    create (user) {
      user.id = this.users.length + 1
  
      this.users.push(user)
  
      return user
    }
  
    update (id, body) {
      let user = this.users.find(user => user.id === Number(id))
      
      if(!user) {
        return false
      }
  
      user = {...user, ...body}
  
      return user
    }
  
    delete (id) {
      let userIndex = this.users.findIndex(user => user.id === Number(id))
  
      if(userIndex === -1) {
        return false
      }
  
      this.users.slice(userIndex, 1)
  
      return true
    }

    getByEmail (email) {
      const user = this.users.find(user => user.email === email)

      return user
    }
  }
  
  module.exports = UsersMemory