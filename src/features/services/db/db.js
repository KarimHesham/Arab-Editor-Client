import { setUser } from "../../../redux/reducers/userSlice";
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

export const createPage = (page, uid, dispatch) => {
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

      UsersService.update("username", page.username, pageData)
        .then(() => {
          getUser(uid).then((res) => {
            dispatch(setUser({ ...res[0] }));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePage = (page, user, oldPage, dispatch) => {
  PagesService.update("id", page.id, page, oldPage, "page")
    .then(() => {
      UsersService.update("uid", user.uid, page, oldPage, "user")
        .then(() => {
          getUser(user.uid).then((res) => {
            dispatch(setUser({ ...res[0] }));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePage = (id, name, user, dispatch) => {
  PagesService.remove(id, name, user.username)
    .then(() => {
      getUser(user.uid)
        .then((res) => {
          dispatch(setUser({ ...res[0] }));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
