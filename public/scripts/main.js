let headers
const BASE_URL = 'http://localhost:5001'

let state = {
  taskList: [],
  task: {}
}



const saveToken = (token) => {
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token
  }
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

const sendMessage = (id) => {
  const sendMessageBtn = document.querySelector('.send-message')
  sendMessageBtn.addEventListener('click', (event) => {
    const inputField = document.querySelector('.message-content').value
    event.preventDefault()
    fetch(BASE_URL+'/tasks/'+id+'/messages', {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({content: inputField})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  })
}


const renderTask = (task) => {
  console.log(task);
  const taskSection = document.querySelector('.tasks')
  const article = document.createElement('article')
  article.innerHTML = `task: ${task.task} client: ${task.client.name} worker: ${task.worker.name} done:${task.done}`
  task.messages.forEach(message => {
    const p = document.createElement('p')
    p.innerHTML = `message: ${message.content} sender: ${message.sender} date: ${message.date}`
    article.append(p)
  })

  taskSection.append(article)
  sendMessage(task._id)
}

const getTask = (id) => {
  fetch(BASE_URL+'/tasks/'+id, {
    method: 'GET',
    headers
  })
  .then(res => res.json())
  .then(data => {
    renderTask(data.task)
  })
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



const fetchTasks = () => {
  return fetch(BASE_URL+'/tasks', {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
  .then(data => state.task = data)
}


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
