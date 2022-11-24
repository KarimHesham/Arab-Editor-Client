import {
  PagesService,
  UsersService,
} from "../../../services/db/DatabaseService";

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

export const createPage = (page) => {
  const newPage = {
    ...page,
  };

  PagesService.create({
    ...newPage,
  })
    .then((res) => {
      const pageData = {
        id: res.id,
        name: page.name,
      };

      UsersService.update("username", page.username, pageData).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
