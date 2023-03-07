import useDebounce from '@/hooks/useDebounce';
import useUserSearchState from '@/zustang/userSearch';
import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const closeUserSearch = useUserSearchState((state) => state.closeUserSearch);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);
  const setUserSearchQuery = useUserSearchState(
    (state) => state.setSearchQuery
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) return;
    setUserSearchQuery(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  return (
    <div className="flex gap-2.5 px-2.5 py-3.5 sm:gap-5 sm:px-5">
      <button
        onClick={() => closeUserSearch()}
        className="rounded-full p-1 transition-colors hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-white/5 dark:active:bg-white/10"
      >
        <IoMdArrowBack className="text-2xl text-zinc-500 dark:text-gray-400" />
      </button>
      <form onSubmit={(e) => e.preventDefault()} className="relative flex-grow">
        <label className="absolute left-2.5 top-2" htmlFor="search">
          <FiSearch className="text-zinc-400" />
        </label>
        <input
          ref={inputRef}
          className="h-8 w-full rounded-md border border-zinc-300 pl-8 pr-2 outline-offset-0 outline-gray-900 placeholder:text-zinc-400 dark:border-gray-600 dark:bg-gray-800/30"
          type="search"
          name="search-users"
          id="search-users"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Header;
