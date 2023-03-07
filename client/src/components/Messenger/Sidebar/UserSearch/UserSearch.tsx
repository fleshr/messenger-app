import Header from './Header';
import UsersList from './UsersList';

const UserSearch = () => {
  return (
    <div className="absolute h-full w-full bg-white dark:bg-gray-700">
      <Header />
      <UsersList />
    </div>
  );
};

export default UserSearch;
