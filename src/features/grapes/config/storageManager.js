// const projectID = 1;
// const projectEndpoint = process.env.FIREBASE_DATABASE_URL;
import { PagesService } from "../../../services/index";
import FireStoreParser from "firestore-parser";

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

        // urlLoad: `https://firestore.googleapis.com/v1/projects/arab-editor/databases/(default)/documents/pages/${pageId}/content`,
        // The `remote` storage uses the POST method when stores data but
        // the json-server API requires PATCH.
        // fetchOptions: (opts) =>
        //   opts.method === "POST" ? { method: "PATCH" } : {},
        // As the API stores projects in this format `{id: 1, data: projectData }`,
        // we have to properly update the body before the store and extract the
        // project data from the response result.

        onStore: (data) => {
          PagesService.update("id", pageId, { content: data }, "", "pages")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        },
        onLoad: (result) => FireStoreParser(result).fields.content,
      },
    },
  };
};
