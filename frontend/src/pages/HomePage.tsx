import HeroComponent from "../components/HeroComponent";
import FeaturesComponent from "../components/FeaturesComponent";
import NavComponent from "../components/NavComponent";

const HomePage = () => {
  return (
    <div className="bg-linear-to-br from-base-100 to-base-300">
      <NavComponent />
      <HeroComponent />
      <FeaturesComponent />
    </div>
  );
};

export default HomePage;
