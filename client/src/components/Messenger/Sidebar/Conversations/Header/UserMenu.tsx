import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLogout } from 'react-icons/md';

interface IProps {
  isShown?: boolean;
  closeMenu: (target: Node) => void;
}

const UserMenu: React.FC<IProps> = ({ isShown = false, closeMenu }) => {
  const closePopup = (e: MouseEvent) => {
    closeMenu(e.target as Node);
  };
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (isShown) document.addEventListener('click', closePopup);
    return () => document.removeEventListener('click', closePopup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute top-10 z-10 w-[200px] rounded-lg bg-white p-1 shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] dark:bg-gray-650">
      <ul>
        <li>
          <button
            onClick={() => {
              theme === 'dark' ? setTheme('light') : setTheme('dark');
            }}
            className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-zinc-100 dark:hover:bg-white/5"
          >
            <MdOutlineDarkMode className="text-2xl text-zinc-500 dark:text-gray-400" />
            <span className="mt-px">Dark Mode</span>
            <div className="relative ml-auto h-3 w-7 rounded-full bg-gray-400 dark:bg-teal-500">
              <div className="absolute -top-0.5 right-0 h-4 w-4 rounded-full border-2 border-gray-400 bg-white dark:left-0 dark:border-teal-500 dark:bg-gray-750"></div>
            </div>
          </button>
        </li>
        <li>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-1.5 rounded-md px-2 py-1  transition-colors hover:bg-zinc-100 dark:hover:bg-white/5"
          >
            <MdOutlineLogout className="text-2xl text-zinc-500 dark:text-gray-400" />
            <span className="mt-px">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
