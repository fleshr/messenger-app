import useConversationFilter from '@/zustang/conversationsFilter';
import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMenuSharp } from 'react-icons/io5';
import UserMenu from './UserMenu';

const Header = () => {
  const [isUserMenuShown, setIsUserMenuShown] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const setConversationFilter = useConversationFilter(
    (state) => state.setConversationFilter
  );

  const closePopup = (target: Node) => {
    if (!menuRef.current?.contains(target)) setIsUserMenuShown(false);
  };

  return (
    <div ref={menuRef} className="flex gap-2.5 px-2.5 py-3.5 sm:gap-5 sm:px-5">
      <div className="relative">
        <button
          onClick={() => setIsUserMenuShown((prev) => !prev)}
          className="rounded-full p-1 transition-colors hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-white/5 dark:active:bg-white/10"
        >
          <IoMenuSharp className="text-2xl text-zinc-500 dark:text-gray-400" />
        </button>
        {isUserMenuShown && (
          <UserMenu closeMenu={closePopup} isShown={isUserMenuShown} />
        )}
      </div>
      <div className="relative flex-grow">
        <label className="absolute left-2.5 top-2" htmlFor="search">
          <FiSearch className="text-zinc-400" />
        </label>
        <input
          onChange={(e) => setConversationFilter(e.target.value)}
          className="h-8 w-full rounded-md border border-zinc-300 pl-8 pr-2 outline-offset-0 outline-gray-900 placeholder:text-zinc-400 dark:border-gray-600 dark:bg-gray-800/30"
          type="search"
          name="search"
          id="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Header;
