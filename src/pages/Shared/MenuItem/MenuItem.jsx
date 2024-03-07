import { TbCurrencyTaka } from "react-icons/tb";
const MenuItem = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div
      style={{ borderRadius: "0 50px 0 50px" }}
      className="flex space-x-4 border  border-x-green-600 p-4"
    >
      <img
        style={{ borderRadius: "0 40px 0 40px" }}
        className="w-[140px] h-[100px]"
        src={image}
        alt=""
      />
      <div>
        <h3 className="text-2xl  font-semibold">{name}</h3>
        <p className="">{recipe}</p>
      </div>

      <div className="w-32">
        <p className="text-white bg-slate-700 h-6 px-2 rounded-lg ">
          <span className="inline">
            <TbCurrencyTaka className="inline-flex font-bold"></TbCurrencyTaka>
          </span>
          {price}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
