import { buildSchema } from 'graphql';

export default buildSchema(`
    type User {
        _id: ID,
        username: String,
        email: String,
      
    }

    type Query {
        listUsers: [User]
    }
`);