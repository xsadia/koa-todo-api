# Running API
- yarn to install dependencies
- access api at localhost:3333
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
