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
### 3. Mutations

Mutations are used to create, update, or delete data on the server.

Example:
```graphql
mutation {
  addPost(title: "New Post", body: "This is a new post") {
    id
    title
  }
}
```
### 4. Variables
GraphQL allows you to pass dynamic values using variables instead of hardcoding them.

Example:
```graphql
query GetPost($postId: ID!) {
  post(id: $postId) {
    id
    title
    body
  }
}
```
Variables:
```json 
{
  "postId": "1"
}
```
### 5. Advantages of GraphQL
| Feature                      | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| **Fetch only what you need** | Avoid over-fetching data.                                    |
| **Single endpoint**          | Unlike REST which may have multiple endpoints.               |
| **Strongly typed**           | Schema defines types, reducing errors.                       |
| **Versionless**              | No versioning required—clients request only required fields. |
| **Real-time support**        | Supports subscriptions for live data updates.                |

### 6. Integrating GraphQL in React
You can use libraries like Apollo Client or Relay to consume GraphQL APIs.

Example with Apollo Client:
```js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://example.com/graphql',
  cache: new InMemoryCache()
});

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Posts />
    </ApolloProvider>
  );
}
```

## Summary
 - GraphQL is a flexible alternative to REST for APIs.
 - Clients request only the data they need.
 - Operations are Queries (read) and Mutations (write).
 - React apps can easily integrate GraphQL using Apollo Client or Relay.