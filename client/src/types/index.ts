export interface IConversation {
  id: string;
  users: IUser[];
  usersIds: string[];
  lastMessage: IMessage;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface IMessage {
  id: string;
  conversationId: string;
  senderId: string;
  createAt: string;
  body: string;
}
