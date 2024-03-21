import { useQuery } from "@tanstack/react-query";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Divider from "../../../components/Divider/Divider";
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

      <Divider title={"Happy Bites"}></Divider>
      {/*users table */}
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="border border-b-slate-100">
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
                <th className="font-normal border border-b-white">
                  {index + 1}
                </th>
                <td className="border border-b-white">{user.name}</td>
                <td className="border border-b-white">{user.email}</td>
                <td className="border border-b-white">Normal</td>
                <td className="border border-b-white">
                  {user.role === "admin" ? (
                    <span className="text-xs bg-slate-100 px-1 py-[1px] rounded-lg ml-2">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 bg-slate-100 py-1 shadow-lg px-2 rounded-xl border border-transparent hover:border-indigo-400 font-semibold"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="border border-b-white">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-red-600 bg-slate-100 py-1 shadow-lg px-2 rounded-xl hover:rounded-lg border border-transparent hover:border-red-500"
                  >
                    <BsTrashFill className="text-red-600"></BsTrashFill>
                    <span className="font-semibold">Delete</span>
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
