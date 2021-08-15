# Running API
- yarn to install dependencies
- yarn dev to run api
- access api at localhost:4000
- yarn test to run test suites 
# API routes
## Create user
`Post /users`
#### Request body data
```
{
  email: string,
  username: string,
  password: string
}
```

#### Response
    Status: 201 Created 
    
    user {
       _id: string
       email: string,
       username: string,
    }
## Authenticate user
`Post /users/auth`
### Request body data
```
{
  email: string
  password: string
}
```

#### Response
    `Status: 200 OK`

    `token: string`
 
## Get user
`Get /users/:id`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 200 OK
```
user: {
  todos: [_id],
  _id: string,
  email: string,
  username: string
}
```
## Delete user
`Delete /users/delete/:id`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 204 No Content

## Create TODO
`Post /todos`
### Request header
```
Authorization: bearer + jwt
```

### Request body data
```
{
  content: string
}
```

#### Response
    `Status: 201 Created`
    ```
    todo: {
      isCompleted: boolean,
      _id: string,
      owner: user id,
      content: string,
      createdAt: Date,
    }```

## Get all TODOS
`Get /todos`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 201 Created
    
    [Todo]

## Get todo
`Get /todos/:id`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 200 OK
```
todo: {
      isCompleted: boolean,
      _id: string,
      owner: user id,
      content: string,
      createdAt: Date,
    }
```
## Complete/Uncomplete TODO
`Patch /todos/:id/complete`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 204 No Content

## Edit TODO
`Patch /todos/:id`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 200 OK
```
todo: {
      isCompleted: boolean,
      _id: string,
      owner: user id,
      content: string,
      createdAt: Date,
    }
```

## Delete TODO
`Delete /todos/delete/:id`
### Request header
```
Authorization: bearer + jwt
```

#### Response
    Status: 204 No Content
    
## Access graphiql interface
`Get /graphql`

`Provide jwt token inside Authorization header for queries/mutations`

# Queries

## Users 

```
users {
    edges {
      node {
        id
        username
        email
        todos {
          edges {
            node {
              id
              content
              isCompleted
              createdAt
            }
          }
        }
      }
      cursor
      
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

## User
```

user {
    id
    username
    email
    todos {
      edges {
        node {
          id
          content
          isCompleted
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
```

## Todos 
```
query {
  todos {
    edges {
      node {
        id
        content
        isCompleted
        createdAt
        owner {
          id
          username
          email
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

## Todo
```
query {
  todo(id: "VG9kbzo2MTE4NTQ0ODFmMWU5NzJjYTRjYmNmN2U=") {
    id
    content
    isCompleted
    createdAt
    owner {
     id
      username
      email
    }
  }
}
```

# Mutations

## Create User

```
CreateUserMutation(input: {
    username: "fezin",
    email: "example@gmail.com", password: "123123"}) {
    token
    error
  }
```

## Auth User

```
AuthUserMutation(input: {email: "example@gmail.com", password: "123123"}) {
    token
    error
  }
```

## Delete User

```
DeleteUserMutation(input: {}) {
    success
    error
  }
```

## Create Todo

```
CreateTodoMutation(input: {content: "Study graphql"}) {
    created
    error
  }
```

## Edit Todo 

```
  EditTodoMutation(input: {id: "VG9kbzo2MTE4NTQ0ODFmMWU5NzJjYTRjYmNmN2U=", content: "study graphql and relay"}) {
    todo {
      node {
        id
        content
        isCompleted
        createdAt
      }
      cursor
    }
    error
  }
```

## Complete Todo 

```
CompleteTodoMutation(input: {id: "VG9kbzo2MTE4M2VmZjQ4NmI5ODFjODAyYzQ4YmM="}) {
    success
    error
  }
```

## Delete Todo

```
DeleteTodoMutation(input: {id: "VG9kbzo2MTE4M2VmZjQ4NmI5ODFjODAyYzQ4YmM="}) {
    success
    error
  }
```
