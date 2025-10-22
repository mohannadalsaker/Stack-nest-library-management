import type { ReactNode } from "react";

interface TextFieldProps<T> {
  placeholder?: string;
  name?: keyof T;
  label?: string;
  type?: "number" | "text" | "date" | "password";
  isRequired?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
}

const TextField = <T,>({
  placeholder,
  name,
  label,
  isRequired = false,
  type = "text",
  className,
  startIcon,
  endIcon,
  error,
  ...props
}: TextFieldProps<T> & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <h3 className="text-secondary-bg font-semibold">
          {label} {isRequired && "*"}
        </h3>
      )}
      <div className="flex flex-col gap-2">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg text-primary-text border ${
            error ? "border-red-500" : "border-slate-300"
          } ${className}`}
        >
          {startIcon && startIcon}
          <input
            className={`outline-none w-full ${className}`}
            {...(name ? { name: name as string } : {})}
            type={type}
            placeholder={placeholder}
            {...props}
          />
          {endIcon && endIcon}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default TextField;
