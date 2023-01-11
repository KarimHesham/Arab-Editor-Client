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

export const createPage = (
  page,
  uid,
  dispatch,
  setLoadingState,
  setLoadingMessage
) => {
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
            setLoadingState(false);
            setLoadingMessage("");
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

export const updatePage = (
  page,
  user,
  oldPage,
  dispatch,
  setLoadingState,
  setLoadingMessage
) => {
  PagesService.update("id", page.id, page, oldPage, "page")
    .then(() => {
      console.log(user.uid, page, oldPage);
      UsersService.update("uid", user.uid, page, oldPage, "user")
        .then(() => {
          getUser(user.uid).then((res) => {
            dispatch(setUser({ ...res[0] }));
          });
          setLoadingState(false);
          setLoadingMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePage = async (
  page,
  user,
  dispatch,
  setLoadingState,
  setLoadingMessage
) => {
  PagesService.remove(page, user.username)
    .then(() => {
      getUser(user.uid)
        .then((res) => {
          dispatch(setUser({ ...res[0] }));
          setLoadingState(false);
          setLoadingMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const buildPage = async (page, setLoadingState, setLoadingMessage) => {
  PagesService.update("id", page.id, page, "", "page")
    .then(() => {
      getPage(page.id)
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

          fetch(process.env.REACT_APP_ARAB_COMPILER_API, {
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
                  setLoadingState(false);
                  setLoadingMessage("");

                  window.open(
                    `${process.env.REACT_APP_ARAB_SERVER}/${res.session}.html`,
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
    })
    .catch((err) => {
      console.log(err);
    });
};
