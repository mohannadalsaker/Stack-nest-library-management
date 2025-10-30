import type { ChangeEvent } from "react";
import PrimaryButton from "./PrimaryButton";
import { Plus, Search } from "lucide-react";
import TextField from "./form/TextField";

interface FeatureHeaderProps {
  title: string;
  description?: string;
  hasButton?: boolean;
  buttonTitle?: string;
  searchPlaceholder?: string;
  onClickAdd?: () => void;
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FeatureHeader = ({
  title,
  buttonTitle,
  description,
  hasButton = true,
  searchPlaceholder,
  onClickAdd,
  onSearch,
}: FeatureHeaderProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between flex-wrap items-center gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{title}</h1>
          {description && <p className="text-secondary-text">{description}</p>}
        </div>
        <div className="flex gap-3">
          {hasButton && (
            <PrimaryButton
              title={buttonTitle}
              icon={Plus}
              onClick={onClickAdd}
              className="text-white"
            />
          )}
        </div>
      </div>
      <TextField
        placeholder={searchPlaceholder || `Search in ${title}`}
        onChange={onSearch}
        startIcon={<Search size={20} className="text-secondary-text" />}
        className="bg-white"
      />
    </div>
  );
};

export default FeatureHeader;
