import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config";

class DatabaseService {
  collectionRef;
  collectionName;

  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
    this.collectionName = collectionName;
  }

  // returns list of records as an array of javascript objects
  getAll = async (key, queryParam) => {
    const result = [];

    const q = query(this.collectionRef, where(key, "==", queryParam));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
    }
    return result;
  };

  // returns a single document in object format
  getOne = async (id) => {
    const docRef = doc(db, this.collectionName, id);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return false;
    }
  };

  // save a new document in the database
  create = async (data) => {
    const newDoc = doc(this.collectionRef);

    const newData =
      this.collectionName === "users"
        ? { id: newDoc.id, ...data }
        : { id: newDoc.id, ...data, lastUpdated: new Date().getTime() };

    await setDoc(newDoc, {
      ...newData,
    }).catch((err) => {
      console.log(err);
    });

    return newDoc;
  };

  // update an existing document with new data
  update = async (key, queryParam, data, oldData, action) => {
    const q = query(this.collectionRef, where(key, "==", queryParam));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const foundDoc = await doc(
        db,
        this.collectionName,
        querySnapshot.docs[0].id
      );

      if (action === "user") {
        const docRef = await doc(db, this.collectionName, foundDoc.id);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const user = docSnap.data();
          user.pages = user.pages.map((page) => {
            if (page.id === oldData.id) {
              return { ...page, name: data.name };
            }
            return page;
          });

          await updateDoc(foundDoc, {
            ...user,
          });
        }
      } else {
        await updateDoc(
          foundDoc,
          this.collectionName === "pages"
            ? {
                ...data,
                lastUpdated: new Date().getTime(),
              }
            : {
                pages: arrayUnion({
                  id: data.id,
                  name: data.name,
                  lastUpdated: new Date().getTime(),
                }),
              }
        );
      }
    }
  };

  // delete an existing document from the collection
  remove = async (page, username) => {
    await deleteDoc(doc(db, this.collectionName, page.id))
      .then(async () => {
        const q = query(
          UsersService.collectionRef,
          where("username", "==", username)
        );

        const result = await getDocs(q);

        if (result.docs.length > 0) {
          const userDoc = doc(
            db,
            UsersService.collectionName,
            result.docs[0].id
          );

          await updateDoc(userDoc, {
            pages: arrayRemove({
              id: page.id,
              name: page.name,
              lastUpdated: page.lastUpdate,
            }),
          }).then(() => {
            console.log("Page removed from user pages...");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const UsersService = new DatabaseService("users");
export const PagesService = new DatabaseService("pages");
