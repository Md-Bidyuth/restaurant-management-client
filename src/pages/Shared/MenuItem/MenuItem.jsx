import { TbCurrencyTaka } from "react-icons/tb";
const MenuItem = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div
      style={{ borderRadius: "0 50px 0 50px" }}
      className="flex flex-1 gap-4 border  border-x-green-600 p-4"
    >
      <img
        style={{ borderRadius: "0 40px 0 40px" }}
        className="w-[140px] h-[100px]"
        src={image}
        alt=""
      />
      <div className="w-full h-[100px] ">
        <h3 className="text-xl  font-semibold">{name}</h3>
        <p className="">
          {recipe.length > 100 ? recipe.slice(0, 100) + "..." : recipe}
          {/* {recipe.slice(0, 100)}... */}
        </p>
      </div>

      <div className="w-32 ">
        <p className="w-full text-white text-center bg-black bg-opacity-50 h-6 rounded-lg ">
          <span className="inline">
            <TbCurrencyTaka className="inline-flex font-bold mb-1"></TbCurrencyTaka>
          </span>
          {price}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
