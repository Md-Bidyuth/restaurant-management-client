import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../../components/Divider/Divider.jsx";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="flex flex-col items-center mb-8">
      {/* <SectionTitle
        heading={"popular items"}
        subHeading={"From Our Menu"}
      ></SectionTitle> */}

      <p className="pb-12"></p>
      <Divider title={"Popular Items"}></Divider>

      <div className="grid md:grid-cols-2 gap-8 m-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to="/order/offered">
        <button className="btn btn-outline bg-indigo-400 border-0 border-b-4 text-white border-slate-700 hover:border-slate-600">
          View All Items
        </button>
      </Link>
    </section>
  );
};

export default PopularMenu;
