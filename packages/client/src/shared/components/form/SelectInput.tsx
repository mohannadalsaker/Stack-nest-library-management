import { type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectInputProps<T> {
  placeholder?: string;
  name?: keyof T;
  label?: string;
  isRequired?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
  options: { label: string; value: string | number }[];
}

const SelectInput = <T,>({
  className,
  endIcon,
  error,
  isRequired,
  label,
  name,
  placeholder,
  startIcon,
  options,
  ...props
}: SelectInputProps<T> & SelectHTMLAttributes<HTMLSelectElement>) => {
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
          <select
            className={`outline-none w-full ${className}`}
            {...(name ? { name: name as string } : {})}
            defaultValue={""}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.length > 0 &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          {endIcon && endIcon}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;
