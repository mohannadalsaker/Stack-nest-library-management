import { User } from "../models/User";
import type { LoginInput } from "../validators/userValidator";

export const login = async (loginData: LoginInput) => {
  const foundUser = await User.findOne({ email: loginData.email });
  if (!foundUser || !(await foundUser.comparePassword(loginData.password)))
    throw new Error("Invalid credentials");
  0;
  return foundUser;
};
