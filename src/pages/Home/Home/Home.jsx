import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import CategorySlider from "../CategorySlider/CategorySlider";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Review from "../Review/Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Happy Bites | Home</title>
      </Helmet>
      <Banner></Banner>
      <CategorySlider></CategorySlider>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Review></Review>
    </div>
  );
};

export default Home;
