# My-TODO

todo fancy api using jquery and ajax

### List of User Routes :

| Route          | Method | Description       | Attributes                   |
| -------------- | ------ | ----------------- | ---------------------------- |
| users/register | POST   | register user     | name,email,username,password |
| users/login    | POST   | login user manual | email & password             |
| users/loginfb  | POST   | login using fb    | email                        |

### List of Task Routes :

| Route            | Method | Description                             | Attributes                      |
| ---------------- | ------ | --------------------------------------- | ------------------------------- |
| tasks/unfinished | GET    | get all user tasks with status not done | user token id                   |
| tasks/finished   | GET    | get all user tasks with status done     | user token id                   |
| tasks/           | POST   | create task                             | activity, due_date, description |
| tasks/:id        | PUT    | update task user                        | id                              |
| tasks/done/:id   | PUT    | update status user with done            | id task                         |
| tasks/:id        | DELETE | delete task user                        | id                              |

### List of Unsplash Routes :

| Route     | Method | Description               | Attributes              |
| --------- | ------ | ------------------------- | ----------------------- |
| /unsplash | GET    | get photo from collection | access key on Client ID |

## USAGE

```
npm install
npm run dev
```

Access via https://todo-andre.firebaseapp.com
