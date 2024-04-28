import React from "react";
import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div>
      {img && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-8 m-10">
        {/* diff: i have sliced the items array */}
        {items.slice(0, 4).map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`} className="flex justify-center mb-8">
        <button className="btn btn-outline bg-amber-600 border-0 border-b-4 text-white border-slate-600 hover:border-slate-600">
          View All Items
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
