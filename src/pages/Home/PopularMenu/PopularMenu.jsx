import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="flex flex-col items-center mb-8">
      <SectionTitle
        heading={"popular items"}
        subHeading={"From Our Menu"}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-8 m-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <button className="btn btn-outline bg-slate-200 border-0 border-b-4 text-black hover:border-slate-600">
        View All Items
      </button>
    </section>
  );
};

export default PopularMenu;
