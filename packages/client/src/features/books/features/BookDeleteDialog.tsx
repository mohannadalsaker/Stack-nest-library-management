import { useDialogStore } from "@/stores";
import { DeleteDialogCard, Loader } from "@/shared/ui";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { useGetBook } from "../api/book/useGetBook";
import { useDeleteBook } from "../api/book/useDeleteBook";

const BookDeleteDialog = () => {
  const { openDeleteId, changeOpenDelete, closeDialog } = useDialogStore();
  const { data, isLoading } = useGetBook(openDeleteId!);
  const { mutate: deleteBook, isPending } = useDeleteBook();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <DeleteDialogCard name={data?.title!} />
      <div className="flex justify-end gap-3">
        <PrimaryButton
          title="Cancel"
          className="bg-white text-black bg-[url('')] border border-secondary-text"
          onClick={() => changeOpenDelete(null)}
        />
        <PrimaryButton
          title="Delete Book"
          className="text-white bg-[url('')] bg-red-500"
          isLoading={isPending}
          onClick={() =>
            deleteBook(openDeleteId!, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default BookDeleteDialog;
