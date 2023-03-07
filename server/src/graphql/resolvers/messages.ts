import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { IContext, IMessage } from "../../types";

const messagesResolvers = {
  Query: {
    getMessages: async (
      _: any,
      { conversationId }: { conversationId: string },
      { prisma, session }: IContext
    ) => {
      if (!session?.user) throw new GraphQLError("Not authorized");
      if (!conversationId.trim())
        throw new GraphQLError("conversationId is empty");

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
        });

        return messages;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createMessage: async (
      _: any,
      { conversationId, message }: { conversationId: string; message: string },
      { prisma, session, pubsub }: IContext
    ) => {
      if (!session?.user) throw new GraphQLError("Not authorized");
      if (!conversationId.trim())
        throw new GraphQLError("conversationId is empty");
      if (!message.trim()) throw new GraphQLError("message is empty");

      try {
        const newMessage = await prisma.message.create({
          data: {
            body: message,
            conversation: { connect: { id: conversationId } },
            sender: { connect: { id: session.user.id } },
          },
        });

        const conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: {
            users: true,
          },
        });

        pubsub.publish("NEW_MESSAGE", { newMessage });
        pubsub.publish("CONVERSATION_UPDATE", {
          conversationUpdate: {
            id: conversation.id,
            users: conversation.users,
            usersIds: conversation.usersIds,
            lastMessage: newMessage,
          },
        });

        return newMessage;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (
          _: any,
          { conversationId }: { conversationId: string },
          { pubsub, session }: IContext
        ) => {
          if (!session?.user) throw new GraphQLError("Not authorized");
          if (!conversationId.trim())
            throw new GraphQLError("conversationId is empty");
          return pubsub.asyncIterator(["NEW_MESSAGE"]);
        },
        (
          payload: { newMessage: IMessage },
          variables: { conversationId: string }
        ) => {
          return payload.newMessage.conversationId === variables.conversationId;
        }
      ),
    },
  },
};

export default messagesResolvers;
