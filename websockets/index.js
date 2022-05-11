const {Server} = require('socket.io')
const UserHandler = require('./userHandler')

module.exports = server => {
  const io = new Server(server)

  io.use((socket, next) => {
    try{
      socket.data.user = UserHandler.authenticate(socket.handshake.auth.token)
      next()
    }catch(error){
      next(error)
    }
  })
    .on('connection', socket => {

      socket.on('join-room', taskId => {
        socket.join(taskId)
      })

      socket.on('leave-room', taskId => {
        socket.leave(taskId)
      })

      socket.on('sendMessage', ({taskId, message}) => {
        const date = UserHandler.getDate()
        io.to(taskId).emit('receiveMessage', {message, user: socket.data.user, date})
      })



  })

}