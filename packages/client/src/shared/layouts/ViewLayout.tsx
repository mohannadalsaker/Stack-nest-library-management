import { type ReactNode } from "react";

const ViewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-8 mb-4 h-[calc(100%-3rem)] w-full overflow-auto">
      {children}
    </div>
  );
};

export default ViewLayout;
