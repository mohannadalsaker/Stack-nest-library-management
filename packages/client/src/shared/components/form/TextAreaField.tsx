import { type TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps<T> {
  placeholder?: string;
  name?: keyof T;
  label?: string;
  isRequired?: boolean;
  containerClassName?: string;
  error?: string;
  rows?: number;
}

const TextAreaField = <T,>({
  containerClassName,
  error,
  isRequired,
  label,
  name,
  placeholder,
  className,
  rows = 3,
  ...props
}: TextAreaFieldProps<T> & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${containerClassName}`}>
      {label && (
        <h3 className="text-secondary-bg font-semibold">
          {label} {isRequired && "*"}
        </h3>
      )}
      <div className="flex flex-col gap-2">
        <div
          className={`p-2 rounded-lg text-primary-text border ${
            error ? "border-red-500" : "border-slate-300"
          }`}
        >
          <textarea
            className={`outline-none w-full bg-transparent resize-y ${className}`}
            {...(name ? { name: name as string } : {})}
            placeholder={placeholder}
            rows={rows}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default TextAreaField;
