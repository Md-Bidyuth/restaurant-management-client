import { useQuery } from "@tanstack/react-query";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Sure to add  '${user.name}'  as an Admin?`,
      text: "This user will have extra credential",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add as admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${user.name} has been added as Admin Successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
      {/* heading line */}
      <div className="flex justify-evenly">
        <h2 className="text-2xl">All Users</h2>
        <h2 className="text-2xl">Total Users : {users.length}</h2>
      </div>
      <div className="divider divider-neutral">
        <span className="bg-indigo-400 text-white px-2 pb-[2px] rounded-full">
          Happy Bites
        </span>
      </div>
      {/*users table */}
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="">
            <tr>
              <th className="text-lg font-semibold">SL No.</th>
              <th className="text-lg font-bold">Name</th>
              <th className="text-lg font-semibold">Email</th>
              <th className="text-lg font-semibold">Role</th>
              <th className="text-lg font-semibold">Action 1</th>
              <th className="text-lg font-semibold">Action 2</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th className="font-normal">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Normal</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-xs bg-slate-50 px-1 py-[1px] rounded-lg ml-2">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="flex items-center gap-1 text-xs text-indigo-600 hover:text-white bg-slate-100 hover:bg-indigo-400 py-1 shadow-lg px-2 rounded-xl border border-indigo-400 font-semibold"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="flex items-center gap-1 text-xs bg-slate-100  py-1 shadow-lg px-2 rounded-xl border border-indigo-500 hover:border-red-500  text-red-500 "
                  >
                    <BsTrashFill className=""></BsTrashFill>
                    <span className="text-indigo-500 hover:text-red-500 font-semibold ">
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

export default AllUsers;
