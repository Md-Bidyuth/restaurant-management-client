import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>
        <span>Hi...</span>
        {user?.displayName ? user.displayName : "Back"}
        <span>! Welcome to your home.</span>
      </h2>
    </div>
  );
};

export default UserHome;
