import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { IContext, IConversation } from "../../types";

const conversationsResolvers = {
  Query: {
    getOrCreateConversationWithUser: async (
      _: any,
      { userId }: { userId: string },
      { prisma, session, pubsub }: IContext
    ) => {
      if (!session?.user) throw new GraphQLError("Not authorized");
      if (!userId) throw new GraphQLError("userId is empty");

      try {
        const existConversation = await prisma.conversation.findFirst({
          where: {
            OR: [
              { usersIds: { equals: [userId, session.user.id] } },
              { usersIds: { equals: [session.user.id, userId] } },
            ],
          },
          include: {
            users: true,
            messages: { orderBy: { createAt: "desc" }, take: 1 },
          },
        });

        if (existConversation)
          return {
            id: existConversation.id,
            users: existConversation.users,
            usersIds: existConversation.usersIds,
            lastMessage: existConversation.messages[0],
          };

        const newConversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [{ id: session.user.id }, { id: userId }],
            },
          },
          include: {
            users: true,
          },
        });

        const newMessage = await prisma.message.create({
          data: {
            body: `${session.user.name} started conversation`,
            conversation: { connect: { id: newConversation.id } },
            sender: { connect: { id: session.user.id } },
          },
        });

        const newConversationWithLastMessage = {
          id: newConversation.id,
          users: newConversation.users,
          usersIds: newConversation.usersIds,
          lastMessage: newMessage,
        };

        pubsub.publish("CONVERSATION_UPDATE", {
          conversationUpdate: newConversationWithLastMessage,
        });

        return newConversationWithLastMessage;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getConversations: async (
      _: any,
      __: any,
      { prisma, session }: IContext
    ) => {
      if (!session?.user) throw new GraphQLError("Not authorized");

      try {
        const conversations = await prisma.conversation.findMany({
          where: { users: { some: { id: session.user.id } } },
          include: {
            users: true,
            messages: { orderBy: { createAt: "desc" }, take: 1 },
          },
        });

        return conversations.map((conversation) => ({
          id: conversation.id,
          users: conversation.users,
          usersIds: conversation.usersIds,
          lastMessage: conversation.messages[0],
        }));
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Subscription: {
    conversationUpdate: {
      subscribe: withFilter(
        (_: any, __: any, { session, pubsub }: IContext) => {
          if (!session?.user) throw new GraphQLError("Not authorized");
          return pubsub.asyncIterator(["CONVERSATION_UPDATE"]);
        },
        (
          payload: { conversationUpdate: IConversation },
          _: any,
          { session }: IContext
        ) => {
          return payload.conversationUpdate.users.some(
            (user) => user.id === session.user.id
          );
        }
      ),
    },
  },
};

export default conversationsResolvers;
