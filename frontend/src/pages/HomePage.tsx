import HeroComponent from "../components/HeroComponent";
import FeaturesComponent from "../components/FeaturesComponent";
import HomeNavComponent from "../components/HomeNavComponent";

const HomePage = () => {
  return (
    <div className="bg-linear-to-br from-base-100 to-base-300">
      <HomeNavComponent />
      <HeroComponent />
      <FeaturesComponent />
    </div>
  );
};

export default HomePage;
