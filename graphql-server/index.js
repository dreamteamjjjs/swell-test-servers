const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');

const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

// Initialize a pubsub system to push subscriptions
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

// Define the schema
const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    addMessage(content: String!): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;

// Sample messages data
let messages = [];

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    addMessage: (_, { content }) => {
      const id = messages.length + 1;
      const message = { id, content };
      messages.push(message);
      pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await subscriptionServer.close();
          },
        };
      },
    },
  ],
});

// Function to start the server
async function startServer() {
  const { url, subscriptionsUrl } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
}

startServer().catch((error) => {
  console.error('Failed to start the server:', error);
});
