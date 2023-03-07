import Loader from '@/components/Loader';
import { SEARCH_USERS_QUERY } from '@/graphql';
import { IUser } from '@/types';
import useUserSearchState from '@/zustang/userSearch';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import User from './User';

const UsersList = () => {
  const searchUsersQuery = useUserSearchState((state) => state.searchQuery);
  const setSearchUsersQuery = useUserSearchState(
    (state) => state.setSearchQuery
  );
  const [searchUsers, { data, loading }] = useLazyQuery<{
    searchUsers: IUser[];
  }>(SEARCH_USERS_QUERY, { fetchPolicy: 'cache-and-network' });

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!searchUsersQuery) return;
    searchUsers({
      variables: { searchQuery: searchUsersQuery },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUsersQuery]);

  useEffect(() => {
    setUsers(data?.searchUsers ?? []);
  }, [data?.searchUsers]);

  useEffect(() => {
    return () => {
      setUsers([]);
      setSearchUsersQuery(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  return (
    <ul className="scrollable flex-grow sm:pl-2.5 sm:pr-1">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
