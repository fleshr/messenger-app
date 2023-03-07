import useSelectConverstaionState from '@/zustang/selectedConversation';
import Header from './Header';
import MessageInput from './MessageInput';
import Messages from './Messages/Messages';

const Chat = () => {
  const selectedConversation = useSelectConverstaionState(
    (state) => state.selectedConversation
  );

  return (
    <div className="flex w-screen flex-col bg-chat-light dark:bg-chat-dark lg:w-full">
      {selectedConversation && (
        <>
          <Header conversation={selectedConversation} />
          <div className="flex flex-grow flex-col items-center">
            <Messages conversationId={selectedConversation.id} />
            <MessageInput conversationId={selectedConversation.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
