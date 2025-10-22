import { TextField } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { Loader } from "@/shared/ui";
import { useUserForm } from "../hooks";

const UserForm = () => {
  const {
    sendForm,
    closeDialog,
    register,
    errors,
    isLoadingCategory,
    isCreating,
    isUpdating,
    openEditId,
  } = useUserForm();

  if (isLoadingCategory) return <Loader />;

  return (
    <form onSubmit={sendForm}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <TextField
              label="Username"
              placeholder="Enter name"
              error={errors.username?.message}
              isRequired
              {...register("username")}
            />
            <TextField
              label="Email"
              placeholder="Enter email"
              error={errors.email?.message}
              isRequired
              {...register("email")}
            />
          </div>
          <div className="flex gap-6">
            <TextField
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              isRequired
              {...register("password")}
            />
            {/* <TextField
              label="Role"
              placeholder="Enter role"
              error={errors.role?.message}
              isRequired
              {...register("role")}
            /> */}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <PrimaryButton
            title="Cancel"
            type="button"
            className="bg-white bg-[url('')] text-black border border-secondary-text"
            onClick={closeDialog}
          />
          <PrimaryButton
            title={openEditId ? "Edit User" : "Add User"}
            type="submit"
            className="text-white"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};

export default UserForm;
