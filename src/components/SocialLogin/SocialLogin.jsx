import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full btn-primary btn btn-outline"
        >
          <FcGoogle className="text-xl"></FcGoogle>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
