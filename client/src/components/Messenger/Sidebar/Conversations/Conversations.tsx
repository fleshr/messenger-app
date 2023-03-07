import useUserSearchState from '@/zustang/userSearch';
import { BsFillChatFill } from 'react-icons/bs';
import Header from './Header/Header';
import LastMessages from './LastMessages/LastMessages';

const Conversations = () => {
  const openUserSearch = useUserSearchState((state) => state.openUserSearch);

  return (
    <>
      <Header />
      <LastMessages />
      <button
        onClick={() => openUserSearch()}
        className="absolute bottom-2.5 right-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-teal-300 text-white shadow-md transition-all hover:bottom-3 hover:bg-teal-300/90 hover:shadow-lg dark:bg-teal-600 dark:text-gray-50 sm:bottom-5 sm:right-5 sm:hover:bottom-[22px]"
      >
        <BsFillChatFill className="text-xl" />
      </button>
    </>
  );
};

export default Conversations;
