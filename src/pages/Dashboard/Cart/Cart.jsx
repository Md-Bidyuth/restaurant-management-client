import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl">Items: {cart.length}</h2>
        <h2 className="text-2xl">Total Price: {totalPrice.toFixed(2)}</h2>
        <button className="px-4 py-1 bg-slate-100 rounded-lg border border-indigo-500 text-indigo-500">
          Pay
        </button>
      </div>
      <div className="divider divider-neutral">
        <span className="bg-indigo-400 text-white px-2 pb-[2px] rounded-full">
          Happy Bites
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="table  w-600">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg font-semibold">SL No.</th>
              <th className="text-lg font-semibold">Image</th>
              <th className="text-lg font-semibold ps-8">Name</th>
              <th className="text-lg font-semibold ps-8">Price</th>
              <th className="text-lg font-semibold ps-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th className="">
                  <span className=" px-6 text-slate-500 font-semibold bg-slate-100 bg-opacity-50 p-1 rounded-full">
                    {index + 1}
                  </span>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar rounded-lg w-16 border-2 border-white">
                      {/* mask mask-squircle */}
                      <div className=" p-[1px]">
                        <img
                          className="border rounded-lg border-black p-[2px]"
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="bg-slate-100 bg-opacity-50 px-4 py-1 rounded-full">
                    {item.name}
                  </span>
                </td>
                <td className="">
                  <span className="bg-slate-100 bg-opacity-50 px-4 py-1 rounded-full font-normal">
                    <span className=" font-serif text-sm">৳ </span>
                    {item.price}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 text-xs bg-slate-100 py-1 shadow-lg px-2 rounded-xl border border-black hover:border-red-500"
                  >
                    <BsTrashFill className="text-red-600"></BsTrashFill>
                    <span className="font-semibold hover:text-red-500">
                      Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
