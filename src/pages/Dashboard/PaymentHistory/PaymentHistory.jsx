import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Divider from "../../../components/Divider/Divider";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl">Total Payments: {payments.length}</h2>
      <Divider title={"Payment History"}></Divider>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-base ">
              <th>SL No.</th>
              <th>Email</th>
              <th>Paid Amount</th>
              <th>Payment Date</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td className=" text-xs font-semibold">{index + 1}</td>
                <td className="text-xs font-semibold">{payment.email}</td>
                <td>
                  <span className="bg-slate-100 bg-opacity-50 px-2 py-[1px] rounded-full text-xs ">
                    <span className=" font-serif text-xs">৳ </span>{" "}
                    <span className="font-semibold">{payment.price}</span>
                  </span>
                </td>

                <td className="text-xs font-semibold">
                  {moment(payment.date).format("LL")}
                  {" -- "}
                  {moment(payment.date).format("h:mm:ss a")}
                </td>
                <td className="text-xs font-semibold">
                  {payment.transactionId}
                </td>

                <td>
                  <p className="bg-slate-100 bg-opacity-80 inline rounded-full px-2 py-[1px] text-green-600 font-semibold text-xs">
                    {payment.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
