import { gql } from '@apollo/client';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($conversationId: String, $message: String) {
    createMessage(conversationId: $conversationId, message: $message) {
      id
      conversationId
      senderId
      createAt
      body
    }
  }
`;

export const GET_MESSAGES_QUERY = gql`
  query GetMessages($conversationId: String) {
    getMessages(conversationId: $conversationId) {
      id
      conversationId
      senderId
      createAt
      body
    }
  }
`;

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription NewMessage($conversationId: String) {
    newMessage(conversationId: $conversationId) {
      body
      conversationId
      createAt
      id
      senderId
    }
  }
`;

export const GET_CONVERSATIONS_QUERY = gql`
  query GetConversations {
    getConversations {
      id
      users {
        id
        name
        email
        image
      }
      usersIds
      lastMessage {
        id
        conversationId
        senderId
        createAt
        body
      }
    }
  }
`;

export const CONVERSATION_UPDATE_SUBSCRIPTION = gql`
  subscription ConversationUpdate {
    conversationUpdate {
      id
      users {
        id
        name
        email
        image
      }
      usersIds
      lastMessage {
        id
        conversationId
        senderId
        createAt
        body
      }
    }
  }
`;

export const GET_OR_CREATE_CONVERSAION_QUERY = gql`
  query GetOrCreateConversationWithUser($userId: String) {
    getOrCreateConversationWithUser(userId: $userId) {
      id
      users {
        id
        name
        email
        image
      }
      usersIds
      lastMessage {
        id
        conversationId
        senderId
        createAt
        body
      }
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($searchQuery: String) {
    searchUsers(searchQuery: $searchQuery) {
      id
      name
      email
      image
    }
  }
`;
