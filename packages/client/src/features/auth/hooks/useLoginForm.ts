import { useAuthStore } from "@/stores";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type LoginFormFields,
  LoginFormSchema,
} from "../validation/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../api/useLogin";
import { useNavigate } from "react-router-dom";
import { setLsValue } from "@/utils";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    login(data, {
      onSuccess: (res) => {
        authenticate();
        setLsValue("token", res?.data?.token);
        navigate("/", { replace: true });
      },
    });
  };

  const sendForm = handleSubmit(onSubmit);

  return { sendForm, register, errors, isPending };
};
