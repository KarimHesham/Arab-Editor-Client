import FireStoreParser from "firestore-parser";
import { PagesService } from "../../../services/db/DatabaseService";

export const storageManager = (page) => {
  return {
    type: "remote",
    stepsBeforeSave: 1,
    contentTypeJson: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
    headers: {
      "Content-Type": "application/json",
    },
    options: {
      remote: {
        urlLoad: `${process.env.REACT_APP_GRAPES_FIRESTORE_URL}/${page.id}?mask.fieldPaths=content`,

        onStore: (data, editor) => {
          const htmlCode = editor.getHtml();
          const cssCode = editor.getCss();
          console.log("Editor HTML: ", editor.getHtml());
          console.log("Editor CSS: ", editor.getCss());
          PagesService.update(
            "id",
            page.id,
            { content: data, code: { html: htmlCode, css: cssCode } },
            "",
            "pages"
          )
            .then((res) => console.log("Content stored in db..."))
            .catch((err) => console.log(err));
        },
        onLoad: (result) =>
          FireStoreParser(result)?.fields?.content || {
            pages: [
              {
                component: `
            <div class="test">${page.name}</div>
            <style>.test { color: red; display:flex; align-item: center; justify-content: center }</style>
          `,
              },
            ],
          },
      },
    },
  };
};
