import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const handleAddToCart = () => {
    if (user && user.email) {
      // send the cart item to database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} is added to the cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch to update the cart items count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please, log in to add to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          //  navigate the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 shadow-lg border border-green-600 p-[2px] ">
      <figure className="">
        <img src={image} alt="" />
      </figure>
      <div className="flex flex-col flex-1 p-2 space-y-2">
        <h2 className="card-title">{name}</h2>
        <p className="flex-grow">{recipe}</p>
        <div className="card-actions justify-around items-center">
          <p className=" text-orange-600 bg-base-300 px-4 py-2 rounded-xl">
            Price :<TbCurrencyTaka className="inline mb-1"></TbCurrencyTaka>
            {price}
          </p>
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-200 border-0 border-b-4 py-1 text-orange-600 hover:border-slate-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
