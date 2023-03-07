import { GET_OR_CREATE_CONVERSAION_QUERY } from '@/graphql';
import { IUser } from '@/types';
import useMenuState from '@/zustang/menuState';
import useSelectConverstaionState from '@/zustang/selectedConversation';
import useUserSearchState from '@/zustang/userSearch';
import { useLazyQuery } from '@apollo/client';
import Image from 'next/image';

interface IProps {
  user: IUser;
}

const User: React.FC<IProps> = ({ user }) => {
  const selectConversation = useSelectConverstaionState(
    (state) => state.selectConversation
  );
  const closeUserSearch = useUserSearchState((state) => state.closeUserSearch);
  const setMenuState = useMenuState((state) => state.setMenu);

  const [getOrCreateConversation] = useLazyQuery(
    GET_OR_CREATE_CONVERSAION_QUERY
  );

  const handleUserClick = async () => {
    const { data } = await getOrCreateConversation({
      variables: { userId: user.id },
    });
    if (!data.getOrCreateConversationWithUser) return;
    selectConversation(data.getOrCreateConversationWithUser);
    setMenuState(false);
    closeUserSearch();
  };

  return (
    <li
      onClick={handleUserClick}
      className="flex cursor-pointer gap-2.5 p-2.5 transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-white/5 dark:active:bg-white/10 sm:rounded-md"
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
        <h3 className="font-medium">{user.name}</h3>
        <p className="truncate text-sm text-zinc-500 dark:text-gray-400">
          {user.email}
        </p>
      </div>
    </li>
  );
};

export default User;
