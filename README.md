# LyfeLogger-BE
A restFul API utilizing node/express/PG/JSON WebTokens
# **API User Guide**

|**Table of Contents:**|
|-|
|[Authentication Routes](#Authentication-Routes)| Do Not Require Token
|[User Routes](#User-Routes)| Do Not Require Token
|[task Routes](#task-Routes)| Require Token

Tokens Encrypted through Password and Email.

### **Authentication Routes**

Server located at: not yet deployed

###  **User Registration**:

#### POST */life_logger/auth/users/register*

Creates a new user account.
Returns an object with user info and a JSON web token.

Request:
```javascript
{
  username: "testinguser1", // string (required), must be unique
  password: "testing123!", // string (required)
  email: "testinguser1@mail.gov", // string (required), must be unique

}
```
Response:

```javascript
   "data": {
        "token": "some_token",
        "user": {
            "username": "testinguser1",
            "email": "testing123!",
            "id": 1
        }
    }
```



### **User/ Login** 
[back to top](#api-user-guide)


#### POST */life_logger/auth/users/login*

Validates user's credentials.
Returns an object with user info and a JSON web token.

Request:
```javascript
{
  username: "firstnamelastname", // string (required)
  password: "testing123!", // string (required)
}
```

Response:
```javascript
   "data": {
        "token": "some_token",
        "user": {
            "username": "testinguser1",
            "email": "testing123!",
            "id": 1
        }
    }
```

## **User Routes**
[back to top](#api-user-guide)

#### GET */life_logger/auth/users/*

Returns an array of users. Available to all users.

Request:
```javascript
// No input needed
```
Response:
```
{
    "data": {
        "users": [
            {
                "id": 1,
                "username": "test1",
                "password": "test",
                "email": "test1@test.net"
            },
            {
                "id": 2,
                "username": "test2",
                "password": "test",
                "email": "test2@test.net"
            },
            {
                "id": 3,
                "username": "test3",
                "password": "test",
                "email": "test3@test.net"
            },
            {
                "id": 4,
                "username": "devinsre",
                "password": "$2a$12$QPN4.K4Pjr6hUvi7zFEVm.BB6vznHeBckLWExGxqgHCiRZnF4a5Hu",
                "email": "dev@deve14d"
            }
        ]
    }
}
```
#### GET */life_logger/auth/users/id*

Return a user object at the specified id.

Request:
```javascript
// No input needed
```
Response:
```
{
    "data": {
        "user": {
            "username": "test1",
            "email": "test1@test.net",
            "id": 1
        }
    }
}
```

#### delete */life_logger/auth/users/id*

deletes at the specified id.

Request:
```javascript
// No input needed , gets the ID from slug
```
Response:
```
status 200 
no body
```



#### put */life_logger/auth/users/id*

Updating a company profile. You must be logged in as owner of the company. Only company_name and description are required, other fields are optional. You cannot modify id, username, password, or user_type

Request:

```javascript

{
	"username":"thomas",
	"password": "1234",
	"email": "dev@devsaefase14dd"
}
// none are required. just request to change what you wants specifically
```
Response:
will return user object to show changes
```javascript
{
    "data": {
        "user": {
            "username": "thomas",
            "email": "dev@devsaefase14dd",
            "id": 7
        }
    }
}
```


## **Task Routes**
[back to top](#task-Routes)

#### GET */life_logger/auth/tasks/*

Return a list of all tasks in Database

Request:
```javascript
// No input needed
```
Response:
```
{
    "data": [
        {
            "id": 1,
            "category_name": "Work",
            "task_name": "Change AC air filter",
            "task_notes": "Testing the test.",
            "due_date": "2020-02-29 19:10:25-07",
            "all_day": 1,
            "is_complete": 0,
	    "user_id": 1
        },
        {
            "id": 2,
            "category_name": "Home",
            "task_name": "Change fire alarm batteries",
            "task_notes": "Testing the test.",
            "due_date": "2020-03-22 01:10:25-07",
            "all_day": 1,
            "is_complete": 0,
	    "user_id": 2
        },
        {
            "id": 3,
            "category_name": "Home",
            "task_name": "Change fire alarm batteries",
            "task_notes": "Testing the test.",
            "due_date": "2020-04-22 15:10:25-07",
            "all_day": 0,
            "is_complete": 0,
	    "user_id": 3
        }
    ]
}
```
#### GET */life_logger/auth/tasks/findById/user=:user_id/:task_id*

Returns a specific task object for a specific user both by ID

Request:
```javascript
// No input needed.   Comes from Parameters
```
Response:
```
{
    "data": [
        {
            "id": 1,
            "category_name": "Work",
            "task_name": "Change AC air filter",
            "task_notes": "Testing the test.",
            "due_date": "2020-02-29 19:10:25-07",
            "all_day": 1,
            "is_complete": 0,
	       "user_id": 1
	    

        }
     
      
    ]
}
```
#### GET */life_logger/auth/tasks/findByUserId/:user_id*

Returns a list of task objects for a specific user by ID

Request:
```javascript
// No input needed.   Comes from Parameters
```
Response:
```
{
    "data": [
        {
            "id": 1,
            "category_name": "Work",
            "task_name": "Change AC air filter",
            "task_notes": "Testing the test.",
            "due_date": "2020-02-29 19:10:25-07",
            "all_day": 1,
            "is_complete": 0,
	       "user_id": 1
	    

        },
	 {
            "id": 1,
            "category_name": "Work",
            "task_name": "Change AC air filter",
            "task_notes": "Testing the test.",
            "due_date": "2020-02-29 19:10:25-07",
            "all_day": 1,
            "is_complete": 0,
	       "user_id": 1
	    

        }
     
      
    ]
}
```

#### Post */life_logger/auth/tasks/insertTask*

Adds A task Object
***notes
the end point will take a task name and category name. it will check both tables to see if they exist. if it exists it will not create a new one but instead use the old one. if it does not exist it will create a new one that can be reused. this along with the joins is whats giving us the ability to use many to many schema in the relational database***

Request:
```javascript
{
"user_id": 1, 
"task_name": "Change AC air f", 
"category_name": "Work",
"due_date": "909g",
"all_day": 0,
"task_notes": "salf sf asgf adsga",
 "is_complete": 0
}
```
Response:
```
{
    "data": [
        {
            "id": 16,
            "task_id": 8,
            "user_id": 1,
            "task_notes": "salf sf asgf adsga",
            "category_id": 5,
            "due_date": "909g",
            "all_day": 0,
            "is_complete": 0
        }
    ]
}
```

#### Delte */life_logger/auth/tasks/deleteTask/:task_id/:user_id*

deletes A task Object
***notes
the end point will take a task name and category name. it will check both tables to see if they exist. if it exists it will not create a new one but instead use the old one. if it does not exist it will create a new one that can be reused. this along with the joins is whats giving us the ability to use many to many schema in the relational database***

Request:
```javascript
none => comoes from parameters
```
Response:
```
{message: "task deleted"}
```


