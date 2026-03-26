import { db } from "../_utils/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export async function getItems(userId) {
    const items = [];
    const itemsCollection = collection(db, "users", userId, "items");
    const itemsQuery = query(itemsCollection);
    const querySnapshot = await getDocs(itemsQuery);

    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return items;
}

export async function addItem(userId, item) {
    const itemsCollection = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsCollection, item);
    return docRef.id;
}
