import React from "react";

const Divider = ({ title }) => {
  return (
    <div className="divider divider-neutral">
      <span className="bg-indigo-400 text-white px-2 pb-[2px] rounded-full font-semibold">
        {title}
      </span>
    </div>
  );
};

export default Divider;
