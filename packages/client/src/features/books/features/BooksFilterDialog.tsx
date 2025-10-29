import { SelectInput, TextField } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { useBooksFilter } from "../hooks";
import type { BookFilters, BookStatus } from "../types";

interface BooksFilterDialogProps {
  toggleOpen: () => void;
  filters: Partial<BookFilters>;
  onChangeFilter: (
    key: keyof Partial<BookFilters>,
    value: string | BookStatus | undefined
  ) => void;
  isLoading: boolean;
  onFilter: () => void;
}

const BooksFilterDialog = ({
  toggleOpen,
  filters,
  onChangeFilter,
  isLoading,
  onFilter,
}: BooksFilterDialogProps) => {
  const {
    categories,
    isLoadingCategories,
    isLoadingSubCategories,
    statusOptions,
    subCategories,
  } = useBooksFilter({ category: filters.category });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <TextField
            label="Rating"
            placeholder="Enter rating"
            min={0}
            max={5}
            type="number"
            onChange={(event) => {
              onChangeFilter("rating", event.target.value);
            }}
            value={filters.rating}
          />
          <SelectInput
            options={statusOptions}
            isLoading={false}
            disabled={false}
            label="Status"
            placeholder="Select status"
            onChange={(event) => {
              onChangeFilter("status", event.target.value);
            }}
            value={filters.status}
          />
        </div>
        <div className="flex gap-6">
          <SelectInput
            options={categories!}
            isLoading={isLoadingCategories}
            disabled={isLoadingCategories}
            label="Category"
            placeholder="Select category"
            onChange={(event) => {
              onChangeFilter("category", event.target.value);
            }}
            value={filters.category}
          />
          <SelectInput
            options={subCategories!}
            isLoading={isLoadingSubCategories}
            disabled={isLoadingSubCategories}
            label="Sub category"
            placeholder="Select sub category"
            onChange={(event) => {
              onChangeFilter("subCategory", event.target.value);
            }}
            value={filters.subCategory}
          />
        </div>
        <div className="flex gap-6">
          <TextField
            label="Min available quatnity"
            placeholder="Enter quantity"
            isRequired
            type="number"
            onChange={(event) => {
              onChangeFilter("minAvailableQty", event.target.value);
            }}
            value={filters.minAvailableQty}
          />
          <TextField
            label="Max available quatnity"
            placeholder="Enter quantity"
            isRequired
            type="number"
            onChange={(event) => {
              onChangeFilter("maxAvailableQty", event.target.value);
            }}
            value={filters.maxAvailableQty}
          />
        </div>
        <div className="flex gap-6">
          <TextField
            label="Min total quatnity"
            placeholder="Enter quantity"
            isRequired
            type="number"
            onChange={(event) => {
              onChangeFilter("minTotalQty", event.target.value);
            }}
            value={filters.minTotalQty}
          />
          <TextField
            label="Max total quatnity"
            placeholder="Enter quantity"
            isRequired
            type="number"
            onChange={(event) => {
              onChangeFilter("maxTotalQty", event.target.value);
            }}
            value={filters.maxTotalQty}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <PrimaryButton
          title="Cancel"
          className="bg-white text-black bg-[url('')] border border-secondary-text"
          onClick={toggleOpen}
        />
        <PrimaryButton
          title="Filter"
          className="text-white bg-[url('')] bg-red-500"
          isLoading={isLoading}
          onClick={onFilter}
        />
      </div>
    </div>
  );
};

export default BooksFilterDialog;
