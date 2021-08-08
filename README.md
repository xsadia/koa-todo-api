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

   