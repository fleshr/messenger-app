import useUserSearchState from '@/zustang/userSearch';
import Conversations from './Conversations/Conversations';
import UserSearch from './UserSearch/UserSearch';

const Sidebar = () => {
  const isUserSearchOpened = useUserSearchState(
    (state) => state.isUserSearchOpened
  );

  return (
    <div className="relative flex h-full w-screen flex-none flex-col border-zinc-300 dark:border-gray-800/80 sm:w-[390px] sm:border-r">
      <Conversations />
      {isUserSearchOpened && <UserSearch />}
    </div>
  );
};

export default Sidebar;
