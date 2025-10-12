# GraphQL Basics

GraphQL is a query language for APIs and a runtime to execute those queries. It allows clients to request **exactly the data they need**, making APIs more flexible and efficient compared to traditional REST APIs.

---

## Key Concepts

### 1. **Schema**
The schema defines the **types of data** your API can return and the operations clients can perform. It acts like a contract between client and server.

Example:
```graphql
type Query {
  posts: [Post]
  post(id: ID!): Post
}

type Post {
  id: ID!
  title: String!
  body: String
}
```
### 2. Queries
Queries are used to fetch data from the server. Clients specify exactly what fields they want.
Example:
```graphql
query {
  posts {
    id
    title
  }
}
```
Response:
```json
{
  "data": {
    "posts": [
      { "id": "1", "title": "First Post" },
      { "id": "2", "title": "Second Post" }
    ]
  }
}
```