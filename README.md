# Inge Bra Bygg  

### A REST API built by Niklas Andersson and Linda Marko.
<br>

| Endpoint                 | Requested information                                  | AuthRoles             | Expected response                                |
| ------------------------ | ------------------------------------------------------ | --------------------- | ------------------------------------------------ |
| POST /users              | Req body: name email password role(optional)           | admin                 | message: User created, User object: id, email, name, role               |
| POST /users/login       | Req body: email and password                           | client, worker, admin | JWT token    |
| GET /users/me                  | --                                                     | client, worker, admin | User object: id, email, name, role               |
| GET /users               | Possible query params: page          | admin         | Array: users                                     |
| GET /users/:id           | --                                                     | worker, admin | User object: id, email, name, role               |
| PATCH /users/me         | Req body:email name    | client, worker                 | message: User updated  , Updated User object: id, email, name, role               |
| DELETE /users/:id        | --                                                     | admin                 | message: User is no more    |
| POST /tasks              | Req body: task clientId workerId imageLink(optional)                        | worker                | message: Task created, Task object|
| GET /tasks               | --   | client, worker, admin        | Array of own task objects. If admin, array of every task.                        |
| GET /tasks/:id           | --                                                     | client, worker, admin        | Task object    |
| PATCH /tasks/:id         | Req body: done                                   | worker                | message: Task updated, Updated task object                              |
| DELETE /tasks/:id        | --                                                     | admin                 | message: Task deleted              |
| PUT /tasks/:id/messages | Req body: content                                      | client, worker        | message: Message added, Task object      |
| GET /tasks/:id/messages  | --                      | client, worker, admin        | Array of messages          |
| DELETE /tasks/:taskId/messages/:messageId     | --                                                     | client, worker        | message: Message deleted, Task object |
| POST /tasks/:id/images    | multi-part-form imageFile               | worker, client               | message: Image uploaded successfully                 |
| GET /tasks/:id/images    | --              | worker, client, admin               | image                 |
