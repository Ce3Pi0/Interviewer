import { Code2Icon, UsersIcon, VideoIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  iconType: "users" | "code" | "video";
}

const FeatureComponent = ({ title, description, iconType }: Props) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          {iconType === "users" && (
            <UsersIcon className="size-8 text-primary" />
          )}
          {iconType === "code" && <Code2Icon className="size-8 text-primary" />}
          {iconType === "video" && (
            <VideoIcon className="size-8 text-primary" />
          )}
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
};

export default FeatureComponent;
