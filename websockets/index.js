const {Server} = require('socket.io')
const userHandler = require('./userHandler')

module.exports = server => {
  const io = new Server(server)

  io.use((socket, next) => {
    console.log(socket);
    // const user = userHandler.authenticate(socket.handshake.auth)
    console.log(user);
    next()
  })
  io.on('connection', socket => {

    socket.on('join-room', (taskId) => {
      socket.join(taskId)
    })

    socket.on('leave-room', taskId => {
      socket.leave(taskId)
    })

                          //task-id
    socket.on('sendMessage', ({id, message}) => {
      socket.to(id).emit('receiveMessage', message)
    })



  })

}