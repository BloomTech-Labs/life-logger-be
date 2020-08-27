[![Maintainability](https://api.codeclimate.com/v1/badges/0915a297bde344a86b20/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/life-logger-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/0915a297bde344a86b20/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/life-logger-be/test_coverage)

# API Documentation

#### Backend deployed at [Heroku](https://lyfe-logger-be.herokuapp.com//) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

- Point One
- Point Two
- Point Three
- Point Four

## Endpoints

#### Task Routes

| Method | Endpoint                                     | Access Control | Description                              |
| ------ | -------------------------------------------- | -------------- | ---------------------------------------- |
| GET    | `/api/tasks/findById/user=:user_id/:task_id` | owners         | Get a task by `user_id` and task `id`    |
| GET    | `/api/tasks/findByUserId/:user_id`           | owners         | Get all tasks by `user_id`               |
| POST   | `/api/tasks/createTask`                      | owners         | Add a new events.                        |
| PUT    | `/api/tasks/updateTask/user=:user_id/:id`    | owners         | Update a task by `user_id` and task `id` |
| DELETE | `/api/tasks/deleteTask/user=:user_id/:id`    | owners         | Delete a task by `user_id` and task `id` |

All Task routes require an `authorization` header:

```
{
  authorizaton: {
    token: USER_TOKEN_HERE
  }
}
```

For creating a new task, the POST request for the `/api/tasks/createTask` endpoint requires the following body:

```
{
  "user_id": USER_ID,
  "task_name": TASK_NAME_AS_STRING,
  "category_name": "CATEGORY_NAME_AS_STRING,
  "due_date": DATETIME,
  "is_complete": BOOLEAN (optional, defaults to false),
  "all_day": BOOLEAN (optional, defaults to false),
  "task_notes": STRING (optional, defaults to null)
}
```

This endpoint will then search in the `task_names` table to see if the provided `task_name` already exists for that user. If not, it will also create a new entry in the `task_names` table. Likewise for the `category_name` in the `categories` table.

Return value upon successful task creation:

```
{
  id: TASK ID,
  user_id: USER_ID,
  category_id: CATEGORY_ID,
  task_id: TASK_ID (`id` from entry in `task_names` table),
  task_notes: STRING,
  all_day: BOOLEAN,
  is_complete: BOOLEAN,
  due_date: DATETIME
}
```

#### Users Routes

| Method | Endpoint             | Access Control | Description          |
| ------ | -------------------- | -------------- | -------------------- |
| POST   | `/api/auth/register` | all users      | Register a new user. |
| POST   | `/api/auth/login`    | all users      | Login                |

## Data Model

#### TASKS

---

```
{
   id -- serial PRIMARY KEY,
   user_id -- integer NOT NULL,
   task_id -- integer NOT NULL
   task_notes -- string,
   category_id -- integer,
   due_date -- datetime,
   all_day -- boolean,
   is_complete -- boolean
}
```

#### TASK_NAMES

---

```
{
  id -- serial PRIMARY KEY,
  name -- string NOT NULL,
  user_id -- integer
}
```

#### CATEGORIES

---

```
{
  id -- serial PRIMARY KEY,
  name -- string NOT NULL,
  user_id -- integer
}
```

#### USERS

---

```
{
  id serial PRIMARY KEY,
  username VARCHAR (255) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL
}
```

## Environment Variables

create a .env file that includes the following:

    *  POSTGRESS_DEV_HOST=localhost
    *  POSTGRESS_DEV_PORT=5432
    *  POSTGRESS_DEV_USER=postgres
    *  POSTGRESS_DEV_PASSWORD=password
    *  POSTGRESS_DEV_DATABASE=lifelogger_be
    *  JWT_SECRET="YOUR_SECRET_HERE"

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/life-logger-fe/blob/master/README.md) for details on the frontend of our project.
