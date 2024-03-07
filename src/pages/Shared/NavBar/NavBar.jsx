import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const navOptions = (
    <div className="flex items-center">
      <li>
        <Link to="/">
          <p className="text-white">Home</p>
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <p className="text-white">Our Menu</p>
        </Link>
      </li>
      <li>
        <Link to="/order/salad">
          <p className="text-white">Order Food</p>
        </Link>
      </li>
      <li>
        <Link to="/secret">
          <p className="text-white">Secret</p>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/cart">
          <button className="flex items-center bg-slate-800 bg-opacity-50 p-2 rounded-lg">
            <FaShoppingCart className="mr-2" />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <p>
            <button onClick={handleLogOut} className="bg-black-200 px-4 py-2">
              Logout
            </button>
          </p>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">
              <p className="text-white">Login</p>
            </Link>
          </li>
        </>
      )}
    </div>
  );
  return (
    <>
      <div className="navbar bg-black text-white fixed z-10 bg-opacity-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Happy Bites</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
