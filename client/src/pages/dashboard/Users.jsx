import { useEffect, useState } from "react";
import AccountCard from '../../components/AccountCard';
import DashboardTitle from "../../components/DashboardTitle";
import { useAuth } from "../../contexts/AuthContext";
import { fetchUsers } from "../../services/api";

const Users = () => {

  const [ users, setUsers ] = useState([]);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUsersData = async () => {
      const users = await fetchUsers();
      console.log(users.users);
      setUsers(users.users);
    }

    fetchUsersData();
  }, []);


  return (
    <DashboardTitle
      id="users"
      title="Comptes"
      description="Ajoute ou gère les comptes utilisateurs."
      subTitle="Liste des comptes"
    >
      <div className="users-container" style={{ width: '100%' }}>
        {!user.loading && <AccountCard
          id={user.id}
          login={user.login + ' (Vous)'}
          email={user.email}
          profilePicture={user.profilePicture}
          admin={user.admin}
          canDelete={false}
        />}
        {!user.loading && users.map((userData) => {
          if (userData.login !== user.login) {
            return (
              <AccountCard
                key={userData.id}
                id={userData.id}
                login={userData.login}
                email={userData.email}
                profilePicture={userData.profilePicture}
                admin={userData.admin}
              />
            );
          }
        })}
      </div>
    </DashboardTitle>
  );
}

export default Users;