import FeatureComponent from "./FeatureComponent";
import FeaturesTitleComponent from "./FeaturesTitleComponent";

const FeaturesComponent = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <FeaturesTitleComponent />

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureComponent
          title="HD Video Call"
          description="Crystal clear video and audio for seamless communication during
              interviews"
          iconType="video"
        />
        <FeatureComponent
          title="Live Code Editor"
          description="Collaborate in real-time with syntax highlighting and multiple
              language support"
          iconType="code"
        />

        <FeatureComponent
          title="Easy Collaboration"
          description="Share your screen, discuss solutions, and learn from each other in
              real-time"
          iconType="users"
        />
      </div>
    </div>
  );
};

export default FeaturesComponent;
