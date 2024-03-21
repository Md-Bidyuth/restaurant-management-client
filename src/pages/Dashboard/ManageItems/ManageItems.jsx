import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Divider from "../../../components/Divider/Divider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          //   refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item.name} has been Deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <Divider title={"Manage Items"}> </Divider>
      <table className="table  w-600">
        {/* head */}
        <thead>
          <tr>
            <th className="text-lg font-semibold">SL No.</th>
            <th className="text-lg font-semibold">Image</th>
            <th className="text-lg font-semibold ps-8">Name</th>
            <th className="text-lg font-semibold ps-8">Price</th>
            <th className="text-lg font-semibold ">Action-1</th>
            <th className="text-lg font-semibold ">Action-2</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item, index) => (
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
              <td className="">
                <Link to={`/dashboard/updateItem/${item._id}`}>
                  <button className="flex items-center gap-1 text-xs text-indigo-600 bg-slate-100 py-1 shadow-lg px-2 rounded-xl hover:rounded-lg border border-indigo-600 font-semibold hover:font-bold">
                    <span className="">Update</span>
                  </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="flex items-center gap-1 text-xs hover:text-red-600 bg-slate-100 py-1 shadow-lg px-2 rounded-xl hover:rounded-lg border border-black hover:border-red-500 font-semibold hover:font-bold"
                >
                  <BsTrashFill className="text-red-600"></BsTrashFill>
                  <span className="">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageItems;
