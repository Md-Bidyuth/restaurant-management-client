import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Divider from "../../../components/Divider/Divider";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
// const options = {
//   mode: "payment",
//   amount: 1099,
//   currency: "usd",
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };
const Payment = () => {
  return (
    <div>
      <Divider title={"Please Pay to Eat"}></Divider>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
