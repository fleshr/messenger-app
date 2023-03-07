import { CREATE_MESSAGE_MUTATION } from '@/graphql';
import { IMessage } from '@/types';
import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';

interface IProps {
  conversationId: string;
}

const MessageInput: React.FC<IProps> = ({ conversationId }) => {
  const [message, setMessage] = useState('');
  const [createMessage] = useMutation<{
    createMessage: IMessage;
  }>(CREATE_MESSAGE_MUTATION);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    await createMessage({
      variables: { conversationId, message },
    });

    inputRef.current?.blur();
    setMessage('');
  };

  return (
    <div className="w-full px-2.5 pt-1 pb-2.5 sm:px-5 sm:pb-5 lg:max-w-[680px]">
      <form onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-[42px] w-full rounded-md bg-white px-5 shadow placeholder:text-zinc-400 dark:bg-gray-800/75"
          type="text"
          placeholder="Type a message"
        />
      </form>
    </div>
  );
};

export default MessageInput;
