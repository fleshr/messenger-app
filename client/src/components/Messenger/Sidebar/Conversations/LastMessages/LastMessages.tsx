import Loader from '@/components/Loader';
import {
  CONVERSATION_UPDATE_SUBSCRIPTION,
  GET_CONVERSATIONS_QUERY,
} from '@/graphql';
import { IConversation } from '@/types';
import useConversationFilter from '@/zustang/conversationsFilter';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LastMessage from './LastMessage';

const LastMessages = () => {
  const session = useSession();
  const { data, loading, subscribeToMore } = useQuery<{
    getConversations: IConversation[];
  }>(GET_CONVERSATIONS_QUERY);
  const conversationFilter = useConversationFilter(
    (state) => state.converstaionFilter
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<{ conversationUpdate: IConversation }>({
      document: CONVERSATION_UPDATE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          getConversations: [
            subscriptionData.data.conversationUpdate,
            ...prev.getConversations.filter(
              (conversation) =>
                conversation.id !== subscriptionData.data.conversationUpdate.id
            ),
          ],
        };
      },
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  return (
    <ul className="scrollable flex-grow sm:pl-2.5 sm:pr-1">
      {data?.getConversations
        .filter((conversation) => {
          if (!conversationFilter) return true;

          const user = conversation.users.filter(
            (user) => user.id !== session.data?.user.id
          )[0];

          return (
            user.name
              .toLocaleLowerCase()
              .indexOf(conversationFilter.toLocaleLowerCase()) > -1
          );
        })
        .map((conversation) => (
          <LastMessage key={conversation.id} conversation={conversation} />
        ))}
    </ul>
  );
};

export default LastMessages;
