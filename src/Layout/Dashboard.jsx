import React from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCalendarAlt, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import {
  MdFeaturedPlayList,
  MdLibraryBooks,
  MdManageHistory,
  MdMapsHomeWork,
  MdRateReview,
} from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  //get isAdmin value from the database
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  return (
    <div className="flex">
      {/* dashboard sidebar*/}
      <div className="w-64 min-h-screen bg-indigo-400 text-white font-semibold">
        <ul className="menu">
          {/* --------general logged user nav links--------- */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <MdMapsHomeWork></MdMapsHomeWork>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <ImSpoonKnife></ImSpoonKnife>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <MdManageHistory></MdManageHistory>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <MdLibraryBooks></MdLibraryBooks>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUserGroup></FaUserGroup>
                  All users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <MdMapsHomeWork></MdMapsHomeWork>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt></FaCalendarAlt>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">
                  <MdRateReview></MdRateReview>
                  My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <MdFeaturedPlayList></MdFeaturedPlayList>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          <div className="divider divider-neutral"></div>
          {/*-------------------- shared nav links------------------ */}
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <BiSolidFoodMenu></BiSolidFoodMenu>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <PiPhoneCallFill></PiPhoneCallFill>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-10 bg-blue-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
