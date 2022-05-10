import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
let socket = io({
  autoConnect: false
})


let headers
const BASE_URL = 'http://localhost:5001'

let state = {
  taskList: [],
  task: {},
}


const saveToken = token => {
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token
  }
}


const addMessage = message => {
  const article = document.querySelector('article')
  const p = document.createElement('p')
  p.innerHTML = `message: ${message}`
  article.append(p)
}


const createTaskListHtml = () => {
  const taskSection = document.querySelector('.tasks')
  const ul = document.createElement('ul')
  state.taskList.forEach(task => {
    const li = document.createElement('li')
    li.innerText = `Task: ${task.task} done: ${task.done}`
    li.addEventListener('click', () => getTask(task._id))
    ul.append(li)
  })
  taskSection.append(ul)
}

const createSendMessageForm = () => {
  const sendMessageForm = document.querySelector('.send-message')
  sendMessageForm.innerHTML = `
    <form class="send-message">
      <input class="message-content" type="text" name="message" placeholder="Enter message" />
      <button>Send Message</button>
    </form>
  `
  const sendMessageBtn = document.querySelector('.send-message button')
  const inputField = document.querySelector('.send-message input')
  document.body.append(sendMessageForm)
  sendMessageBtn.addEventListener('click', event => {
    event.preventDefault()
    const content = inputField.value
    inputField.value = ''
    fetch(BASE_URL+'/tasks/'+state.task._id+'/messages', {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({content})
    })
    .then( () => {
      socket.emit('sendMessage', {id: state.task._id, message: content})
      addMessage(content)
    })
  })
}


const renderTask = task => {
  const taskSection = document.querySelector('.tasks')
  const article = document.querySelector('.tasks article')
  article.innerHTML = `task: ${task.task} client: ${task.client.name} worker: ${task.worker.name} done:${task.done}`
  task.messages.forEach(message => {
    const p = document.createElement('p')
    p.innerHTML = `message: ${message.content} sender: ${message.sender} date: ${message.date}`
    article.append(p)
  })

  taskSection.append(article)
  createSendMessageForm()
}

const getTask = id => {
  if(socket.connected){
    socket.emit('leave-room', state.task._id)
  }else{
    socket.connect()
  }
  fetch(BASE_URL+'/tasks/'+id, {
    method: 'GET',
    headers
  })
  .then(res => res.json())
  .then(data => {
    state.task = data.task
    renderTask(state.task)
    socket.emit('join-room', state.task._id)
  })
}






const fetchTasks = () => {
  return fetch(BASE_URL+'/tasks', {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
}


const login = (email, password) => {
  return fetch(BASE_URL+'/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
  .then(data => {
    saveToken(data.token)})
}

const init = () => {
  const loginBtn = document.querySelector('.login-form button')
  loginBtn.addEventListener('click', event => {
    event.preventDefault()
    const loginForm = document.querySelector('.login-form')
    const email = loginForm[0].value
    const password = loginForm[1].value
    login(email, password)
    .then(() => {
      fetchTasks()
      .then(data => {
      state.taskList = data.tasks
      createTaskListHtml()
      })
    })
  })
}
init()


socket.on('receiveMessage', addMessage)