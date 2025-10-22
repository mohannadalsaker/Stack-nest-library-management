import type { ReactNode } from "react";

const DataLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-8 h-[calc(100%-3rem)] w-full overflow-hidden">
      {children}
    </div>
  );
};

export default DataLayout;
