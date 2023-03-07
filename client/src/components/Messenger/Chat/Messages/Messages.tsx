import Loader from '@/components/Loader';
import { GET_MESSAGES_QUERY, NEW_MESSAGES_SUBSCRIPTION } from '@/graphql';
import { IMessage } from '@/types';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Message from './Message';

interface IProps {
  conversationId: string;
}

const Messages: React.FC<IProps> = ({ conversationId }) => {
  const session = useSession();
  const { data, loading, subscribeToMore } = useQuery<{
    getMessages: IMessage[];
  }>(GET_MESSAGES_QUERY, { variables: { conversationId } });

  useEffect(() => {
    const unsubscribe = subscribeToMore<{ newMessage: IMessage }>({
      document: NEW_MESSAGES_SUBSCRIPTION,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          getMessages: [...prev.getMessages, subscriptionData.data.newMessage],
        };
      },
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scrollable flex w-full flex-grow basis-0 flex-col-reverse items-center pt-2.5 pl-2.5 pr-1 pb-1.5 sm:pl-5 sm:pr-3.5 sm:pb-4 sm:pt-5">
      <div className="flex min-h-full w-full flex-col justify-end gap-2.5 lg:max-w-[640px]">
        {loading && <Loader />}
        {data?.getMessages &&
          data.getMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isUserMessage={message.senderId === session.data?.user.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Messages;
