import { useDialogStore } from "@/stores";
import { useUsersTable } from "../hooks";
import { Dialog, MainTable } from "@/shared/components";
import UserForm from "./UsersForm";
import UserDeleteDialog from "./UserDeleteDialog";
import FeatureHeader from "@/shared/components/FeatureHeader";
import type { UsersTableRow } from "../types";
import { Loader } from "lucide-react";

const UsersDataPage = () => {
  const {
    isOpenAdd,
    openEditId,
    openDeleteId,
    changeOpenDelete,
    toggleOpenAdd,
    changeOpenEdit,
  } = useDialogStore();
  const {
    columns,
    totalUsers,
    rows,
    tableActions,
    tableRef,
    isPending,
    handleScroll,
    isFetchingNextPage,
  } = useUsersTable();

  return (
    <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
      <Dialog
        isOpen={isOpenAdd || Boolean(openEditId)}
        title={isOpenAdd ? "Add User" : "Edit User"}
        onClose={() => {
          if (isOpenAdd) toggleOpenAdd();
          else changeOpenEdit(null);
        }}
      >
        <UserForm />
      </Dialog>
      <Dialog
        isOpen={Boolean(openDeleteId)}
        title={"Delete User"}
        subTitle="The action cannot be undone, the user will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <UserDeleteDialog />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add User"
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        // onSearch={(e) => {
        //   // handleSearch(e.target.value)
        // }}
        title="Users"
        description={`Manage your users inventory (${totalUsers || 0} users)`}
      />

      <div
        className="w-full h-full overflow-auto"
        onScroll={handleScroll}
        ref={tableRef}
      >
        <MainTable<UsersTableRow>
          columns={columns}
          data={rows!}
          actions={tableActions}
        />
        {(isFetchingNextPage || isPending) && (
          <div className="flex justify-center p-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDataPage;
