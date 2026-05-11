import { SignInButton } from "@clerk/react";
import { ArrowRightIcon, VideoIcon } from "lucide-react";

const CtaButtonsComponent = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <SignInButton mode="modal">
        <button className="btn btn-primary btn-lg">
          Start Coding Now
          <ArrowRightIcon className="size-5" />
        </button>
      </SignInButton>

      {/* TODO: Add functionality */}
      <button className="btn btn-outline btn-lg">
        <VideoIcon className="size-5" />
        Watch Demo
      </button>
    </div>
  );
};

export default CtaButtonsComponent;
