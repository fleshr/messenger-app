import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Session } from "next-auth";

export interface IContext {
  session: Session | null;
  pubsub: PubSub;
  prisma: PrismaClient;
}

export interface IMessage {
  id: string;
  conversationId: string;
  senderId: string;
  createAt: string;
  body: string;
}

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
