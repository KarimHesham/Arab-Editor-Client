import FireStoreParser from "firestore-parser";
import { PagesService } from "../../../services/db/DatabaseService";

export const storageManager = (pageId) => {
  return {
    type: "remote",
    stepsBeforeSave: 3,
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
        urlLoad: `https://firestore.googleapis.com/v1/projects/arab-editor/databases/(default)/documents/pages/${pageId}?mask.fieldPaths=content`,

        onStore: (data) => {
          PagesService.update("id", pageId, { content: data }, "", "pages")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        },
        onLoad: (result) => FireStoreParser(result).fieldsresult.fields,
      },
    },
  };
};
