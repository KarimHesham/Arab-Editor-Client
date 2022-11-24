import {
  arrayUnion,
  collection,
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

  // resolve a relation, returns the referenced document
  getReference = async (documentReference) => {
    // const res = await documentReference.get();
    // const data = res.data();
    // if (data && documentReference.id) {
    //   data.uid = documentReference.id;
    // }
    // return data;
  };

  // save a new document in the database
  create = async (data) => {
    const newDoc = doc(this.collectionRef);

    await setDoc(newDoc, {
      id: newDoc.id,
      ...data,
    }).catch((err) => {
      console.log(err);
    });

    return newDoc;
  };

  // update an existing document with new data
  update = async (key, queryParam, data) => {
    const q = query(this.collectionRef, where(key, "==", queryParam));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const foundDoc = doc(db, this.collectionName, querySnapshot.docs[0].id);

      updateDoc(
        foundDoc,
        this.collectionName === "pages"
          ? {
              ...data,
            }
          : { pages: arrayUnion({ id: data.id, name: data.name }) }
      );
    }
  };

  // delete an existing document from the collection
  remove = async (id) => {
    // return await this.collection.doc(id).delete();
  };
}

export const UsersService = new DatabaseService("users");
export const PagesService = new DatabaseService("pages");
