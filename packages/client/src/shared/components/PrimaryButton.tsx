import type { IconType } from "../types";

interface PrimaryButtonProps {
  title?: string;
  icon?: IconType;
  iconColor?: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({
  onClick,
  className,
  disabled,
  icon: Icon,
  iconColor = "white",
  isLoading,
  title,
  type = "button",
}: PrimaryButtonProps) => {
  return (
    <button
      className={`flex gap-2 items-center justify-center bg-primary-gradient rounded-lg p-2 cursor-pointer ${className}`}
      disabled={disabled || isLoading}
      type={type}
      {...(type === "submit" ? {} : { onClick: () => onClick?.() })}
    >
      {Icon && <Icon size={20} className={`text-${iconColor}`} />}
      <h3 className="font-semibold">{title}</h3>
    </button>
  );
};

export default PrimaryButton;
