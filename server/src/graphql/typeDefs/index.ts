const typeDefs = `#graphql
  type User {
    id: ID
    name: String
    email: String
    image: String
  }

  type Message {
    id: ID
    conversationId: ID
    senderId: ID
    createAt: String
    body: String
  }

  type Conversation {
    id: ID
    users: [User]
    usersIds: [ID]
    lastMessage: Message
  }

  type Query {
    searchUsers(searchQuery: String): [User]
    getOrCreateConversationWithUser(userId: String): Conversation
    getConversations: [Conversation]
    getMessages(conversationId: String): [Message]
  }

  type Mutation {
    createMessage(conversationId: String, message: String): Message
  }

  type Subscription {
    newMessage(conversationId: String): Message
    conversationUpdate: Conversation
  }
`;

export default typeDefs;
