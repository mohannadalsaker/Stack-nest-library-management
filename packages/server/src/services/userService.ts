import { User } from "../models/User";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../validators/userValidator";

export const getUsers = async ({
  limit,
  skip,
  q,
}: {
  limit: number;
  skip: number;
  q: string;
}) => {
  const searchFilter = q
    ? {
        $or: [
          { username: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      }
    : {};
  const [users, total] = await Promise.all([
    User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select("-password"),
    User.countDocuments(searchFilter),
  ]);
  return {
    data: users,
    total,
  };
};

export const createUser = async (userData: CreateUserInput) => {
  const foundUser = await User.findOne({ email: userData.email });
  if (foundUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(userData);
  return await user.save();
};

export const updateUser = async ({
  id,
  userData,
}: {
  id: string;
  userData: UpdateUserInput;
}) => {
  const newUser = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!newUser) {
    throw new Error("User not found");
  }

  return newUser;
};

export const findUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const deleteUser = async (id: string) => {
  await User.findOneAndDelete({ _id: id });
  return;
};
