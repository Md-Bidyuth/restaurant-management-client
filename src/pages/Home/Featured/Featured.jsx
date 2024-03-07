import featuredImg from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./Featured.css";
const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white py-4 mb-10">
      <SectionTitle
        heading={"Featured Item"}
        subHeading={"Check It Out"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center gap-10 py-16 px-48">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div>
          <p>Feb 21, 2024</p>
          <p className="uppercase">Where can i get some ?</p>
          <p className="pb-4 pt-2">
            The exquisite blend of flavors in the signature dish left me
            speechless. From the first bite to the last, each morsel was a
            delightful journey through culinary excellence. The ambiance
            complemented the experience perfectly, creating an unforgettable
            dining experience.
          </p>
          <button className="btn btn-outline bg-slate-800 bg-opacity-50 border-0 border-b-4 text-white hover:border-slate-300">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
