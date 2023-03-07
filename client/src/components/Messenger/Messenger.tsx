import useMenuState from '@/zustang/menuState';
import Chat from './Chat/Chat';
import Sidebar from './Sidebar/Sidebar';

const Messenger = () => {
  const isMenuOpened = useMenuState((state) => state.isMenuOpened);

  return (
    <div className="h-full w-full bg-zinc-200 dark:bg-gray-800">
      <div className="mx-auto h-full w-screen max-w-screen-xl xl:py-5">
        <div className="h-full w-full overflow-hidden bg-white shadow dark:bg-gray-700 xl:rounded-lg">
          <div
            className={`flex h-full w-[200vw] transition-transform will-change-transform lg:w-full ${
              !isMenuOpened
                ? '-translate-x-[100vw] sm:-translate-x-[390px] lg:translate-x-0'
                : 'translate-x-0'
            }`}
          >
            <Sidebar />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
