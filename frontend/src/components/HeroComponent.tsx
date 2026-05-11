import { ZapIcon } from "lucide-react";
import PillComponent from "./PillComponent";
import StatsComponent from "./StatsComponent";
import CtaButtonsComponent from "./CtaButtonsComponent";

const HeroComponent = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="badge badge-primary badge-lg">
            <ZapIcon className="size-4" />
            Real-time Collaboration
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Code Together,
            </span>
            <span className="text-base-content">
              <br />
              Learn together
            </span>
          </h1>

          <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
            The Ultimate platform for collaborative coding interviews and pair
            programming. Connect face-to-face, code in real-time, and ace your
            technical interviews.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            <PillComponent text="Live Video Chat" />
            <PillComponent text="Code Editor" />
            <PillComponent text="Multi Language" />
          </div>

          <CtaButtonsComponent />
          <StatsComponent />
        </div>
        <img
          src="src/assets/hero.png"
          alt="Interviewer Platform"
          className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default HeroComponent;
