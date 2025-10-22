import { X } from "lucide-react";
import type { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

const Dialog = ({
  isOpen,
  onClose,
  children,
  title,
  subTitle,
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-30 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed header */}
          <div className="flex justify-between items-start bg-gray-50 px-4 py-3 sm:px-6 sticky top-0 z-10">
            <div className="flex flex-col gap-1">
              {title && (
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {title}
                </h3>
              )}
              {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="max-h-[60vh] overflow-y-auto px-4 py-5 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
