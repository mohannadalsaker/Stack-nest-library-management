import { User } from "../models/User";
import type { CreateUserInput, LoginInput } from "../validators/userValidator";

export const createUser = async (userData: CreateUserInput) => {
  const foundUser = await User.findOne({ email: userData.email });
  if (foundUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(userData);
  return await user.save();
};

export const login = async (loginData: LoginInput) => {
  const foundUser = await User.findOne({ email: loginData.email });
  if (!foundUser || !(await foundUser.comparePassword(loginData.password)))
    throw new Error("Invalid credentials");

  return foundUser;
};

export const findUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};
