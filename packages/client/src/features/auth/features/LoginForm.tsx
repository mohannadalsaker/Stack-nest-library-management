import * as images from "@/config/imports/images";
import { TextField } from "@/shared/components";
import { useLoginForm } from "../hooks";
import PrimaryButton from "@/shared/components/PrimaryButton";
import type { LoginFormFields } from "../validation/LoginFormSchema";

const LoginForm = () => {
  const { register, errors, isPending, sendForm } = useLoginForm();
  return (
    <div className="rounded-lg shadow-md flex flex-col gap-3 p-5 lg:w-1/3 md:w-1/2 w-[90%] mx-auto">
      <img
        src={images.LogoFilled}
        alt="logo-filled"
        className="w-14 h-14 rounded-lg mx-auto"
      />
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-bold text-xl text-center">Welcome Back</h2>
        <p className="text-primary-text text-center">
          Sign in to access you admin dashbaord
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <TextField<LoginFormFields>
              {...register("email")}
              label="Email"
              placeholder="Enter email"
              error={errors.email?.message}
            />
            <TextField<LoginFormFields>
              {...register("password")}
              label="Password"
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
            />
          </div>
          <PrimaryButton
            title="Sign in"
            type="submit"
            className="text-white"
            isLoading={isPending}
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
