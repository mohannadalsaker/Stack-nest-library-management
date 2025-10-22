import { TriangleAlert } from "lucide-react";

interface DeleteDialogCardProps {
  name: string;
}

const DeleteDialogCard = ({ name }: DeleteDialogCardProps) => {
  return (
    <div className="flex gap-2 p-3 rounded-md border border-red-300 items-baseline">
      <TriangleAlert size={15} color="red" />
      <p className="text-red-400">
        Are you sure you want to delete <b>{name}</b>?
      </p>
    </div>
  );
};

export default DeleteDialogCard;
