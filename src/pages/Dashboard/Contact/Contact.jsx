import useAuth from "../../../hooks/useAuth";
const Contact = () => {
  const { user } = useAuth();
  return (
    <div className="pt-40 text-center">
      <h2 className=" text-lg font-semibold mb-8">
        <span>Hi... </span>
        <span className="text-[#FF00FF] text-xl font-bold opacity-80">
          {user?.displayName ? user.displayName : ""} !!!
        </span>
      </h2>
      <p className="text-xl font-semibold text-slate-500">
        {" "}
        Is There Any issue ???{" "}
      </p>
      <p className="text-xl font-semibold text-slate-500">
        Please, Let us inform through our official email:{" "}
      </p>

      <p className="my-20 text-center  text-2xl font-semibold text-[#FF00FF]">
        <span className="border-2 px-8 py-4 rounded-xl border-slate-400">
          happy@bites.com
        </span>
      </p>
    </div>
  );
};

export default Contact;
