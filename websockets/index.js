const {Server} = require('socket.io')


module.exports = server => {
  const io = new Server(server)

  io.on('connection', socket => {

    socket.on('join-room', taskId => {
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