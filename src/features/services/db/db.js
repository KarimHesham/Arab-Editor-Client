import { UsersService } from "../../../services/db/DatabaseService";

export const createUser = (user) => {
  const newUser = {
    ...user,
    pages: [],
  };
  UsersService.create({
    ...newUser,
  }).catch((err) => {
    console.log(err);
  });
};

export const getUser = (uid) => {
  return UsersService.getAll("uid", uid);
};
