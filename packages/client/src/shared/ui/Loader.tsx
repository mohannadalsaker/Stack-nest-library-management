import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 size={50} className="animate-spin text-primary" />
    </div>
  );
};

export default Loader;
