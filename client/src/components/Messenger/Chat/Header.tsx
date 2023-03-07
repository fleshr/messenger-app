import { IConversation } from '@/types';
import useMenuState from '@/zustang/menuState';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

interface IProps {
  conversation: IConversation;
}

const Header: React.FC<IProps> = ({ conversation }) => {
  const session = useSession();
  const toogleMenu = useMenuState((state) => state.toogleMenu);
  const isMenuOpened = useMenuState((state) => state.isMenuOpened);

  const user = conversation.users.filter(
    (user) => user.id !== session.data?.user.id
  )[0];

  return (
    <div className="flex h-[60px] flex-none items-center gap-2 border-b border-zinc-300 bg-white px-2 dark:border-gray-800/80 dark:bg-gray-700 sm:gap-3.5 sm:px-3.5 lg:px-5">
      <button
        onClick={() => toogleMenu()}
        className="rounded-full p-1.5 text-2xl text-zinc-500 transition-colors hover:bg-zinc-200 active:bg-zinc-300 dark:text-gray-400 dark:hover:bg-white/5 dark:active:bg-white/10 lg:hidden"
      >
        {isMenuOpened ? <IoMdArrowForward /> : <IoMdArrowBack />}
      </button>
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 overflow-hidden rounded-full bg-zinc-300">
          <Image
            height={36}
            width={36}
            src={user.image}
            alt={`${user.name} profile picture`}
          />
        </div>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm leading-tight text-zinc-500 dark:text-gray-400">
            last seen yesterday at 1:38 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
