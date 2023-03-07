import merge from "lodash.merge";
import conversationsResolvers from "./conversations";
import messagesResolvers from "./messages";
import usersResolvers from "./users";

const resolvers = merge(
  {},
  conversationsResolvers,
  messagesResolvers,
  usersResolvers
);

export default resolvers;
