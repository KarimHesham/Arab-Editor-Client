import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config";

class DatabaseService {
  collectionRef;

  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  // returns list of records as an array of javascript objects
  getAll = async (key, queryParam) => {
    const result = [];

    const q = query(this.collectionRef, where(key, "==", queryParam));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        result.push(doc);
      });
    }

    return result;
  };

  // returns a single document in object format
  getOne = async ({ queryKey }) => {
    const { id } = queryKey[1];
    if (!id) return; // entity form is in create mode
    const snapshot = await this.collection.doc(id).get();
    return snapshot.data();
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
    try {
      const newDoc = doc(this.collectionRef);

      await setDoc(newDoc, {
        id: newDoc.id,
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // update an existing document with new data
  update = async (id, values) => {
    // return await this.collection.doc(id).update(values);
  };

  // delete an existing document from the collection
  remove = async (id) => {
    // return await this.collection.doc(id).delete();
  };
}

export const UsersService = new DatabaseService("users");
export const PagesService = new DatabaseService("pages");
