import Divider from "../../../components/Divider/Divider";
import useAuth from "../../../hooks/useAuth";
const ManageBookings = () => {
  const { user } = useAuth();
  return (
    <div className="text-center">
      <h2 className=" text-lg font-semibold mb-8">
        <span>Hi... </span>
        <span className="text-[#FF00FF] text-xl font-bold opacity-80">
          {user?.displayName ? user.displayName : ""}
        </span>
        <span>
          {" "}
          !!! Welcome to{" "}
          <span className="bg-slate-50 px-2 mx-1 pb-[1px] rounded-lg">
            Happy Bites
          </span>{" "}
        </span>
      </h2>
      <div>
        <Divider title={"Manage Bookings"}></Divider>
      </div>
      <h2 className="text-2xl mt-20">Booking will be added here</h2>
    </div>
  );
};

export default ManageBookings;
