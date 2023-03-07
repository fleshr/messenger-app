import { signIn } from 'next-auth/react';
import { BsFillChatFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  return (
    <div className="flex h-1/2 flex-col">
      <div className="flex flex-grow flex-col items-center justify-center py-5">
        <h1 className="flex items-center gap-2.5">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-teal-300 text-white dark:bg-teal-600 dark:text-gray-50">
            <BsFillChatFill className="text-lg" />
          </span>
          <span className="text-2xl font-semibold">Messenger App</span>
        </h1>
      </div>
      <div className="flex flex-col items-center gap-5">
        <p>Please log in to use this app</p>
        <button
          onClick={() => signIn('google')}
          className="flex h-[40px] w-full max-w-[270px] items-center justify-center gap-2 rounded-md border border-zinc-400 transition-colors hover:border-zinc-500 hover:bg-zinc-100 dark:border-gray-500 dark:bg-gray-700/50 dark:hover:border-gray-400 dark:hover:bg-gray-700"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm">Sign In with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
