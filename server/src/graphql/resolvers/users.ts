import { GraphQLError } from "graphql";
import { IContext } from "../../types";

const usersResolvers = {
  Query: {
    searchUsers: async (
      _: any,
      { searchQuery }: { searchQuery: string },
      { prisma, session }: IContext
    ) => {
      if (!session?.user) throw new GraphQLError("Not authorized");
      if (!searchQuery.trim()) throw new GraphQLError("searchQuery is empty");

      try {
        const users = await prisma.user.findMany({
          where: {
            AND: [
              { name: { contains: searchQuery, mode: "insensitive" } },
              { id: { not: session.user.id } },
            ],
          },
        });

        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default usersResolvers;
