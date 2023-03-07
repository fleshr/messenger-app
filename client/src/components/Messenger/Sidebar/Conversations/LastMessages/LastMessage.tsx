import { IConversation } from '@/types';
import useMenuState from '@/zustang/menuState';
import useSelectConverstaionState from '@/zustang/selectedConversation';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface IProps {
  conversation: IConversation;
}

const LastMessage: React.FC<IProps> = ({ conversation }) => {
  const session = useSession();
  const setMenuState = useMenuState((state) => state.setMenu);
  const { selectConversation, selectedConversation } =
    useSelectConverstaionState((state) => state);

  const user = conversation.users.filter(
    (user) => user.id !== session.data?.user.id
  )[0];

  return (
    <li
      onClick={() => {
        setMenuState(false);
        selectConversation(conversation);
      }}
      className={`flex cursor-pointer gap-2.5 p-2.5 transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-white/5 dark:active:bg-white/10 sm:rounded-md ${
        selectedConversation?.id === conversation.id
          ? 'sm:bg-teal-100 sm:hover:bg-teal-200/70 sm:active:bg-teal-200 sm:dark:bg-teal-600/40 sm:dark:hover:bg-teal-600/50 sm:dark:active:bg-teal-600/60'
          : ''
      }`}
    >
      <div className="h-12 w-12 flex-none overflow-hidden rounded-full bg-zinc-300">
        <Image
          height={48}
          width={48}
          src={user.image}
          alt={`${user.name} profile picture`}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between overflow-hidden pt-[3px] pb-0.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{user.name}</h3>
          <span className="text-xs text-zinc-500 dark:text-gray-400">
            {moment(+conversation.lastMessage.createAt).format('MMM D')}
          </span>
        </div>
        <p className="truncate text-sm text-zinc-500 dark:text-gray-400">
          {conversation.lastMessage.body}
        </p>
      </div>
    </li>
  );
};

export default LastMessage;
