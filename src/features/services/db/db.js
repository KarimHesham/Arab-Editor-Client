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
    content: null,
    code: {
      arab: null,
      html: null,
      css: null,
    },
  };

  PagesService.create({
    ...newPage,
  })
    .then(async (res) => {
      const pageData = {
        id: res.id,
        name: page.name,
      };

      UsersService.update("username", page.username, pageData).then(() => {
        getUser(uid)
          .then((res) => {
            console.log(res[0]);
            dispatch(setUser({ ...res[0] }));
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPage = (id) => {
  return PagesService.getAll("id", id);
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

export const deletePage = async (page, user, dispatch) => {
  PagesService.remove(page, user.username)
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

export const buildPage = async (pageId) => {
  getPage(pageId)
    .then((res) => {
      let input = {
        html: `<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${res[0].name}</title>
    <style>${res[0].code.css}</style>
    </head>
    ${res[0].code.html}
    </html>`,
        code: res[0].code.arab ? res[0].code.arab : "",
        project: res[0].name,
      };

      fetch("https://arabcode.ae/api/External", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(input),
      })
        .then((res) => {
          res
            .json()
            .then((res) => {
              window.open(
                `https://arabcode.ae/Log/Output/${res.session}.html`,
                "_blank"
              );
            })
            .catch((err) => {
              console.log(err);
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
