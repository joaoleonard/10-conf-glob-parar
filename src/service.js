import { useCollection } from "vuefire";
import { Question } from "./views/LecturePage.vue";
import { orderBy, query, collection } from "firebase/firestore";
import { db } from "./firebase";

export function dbCollectionsService() {
    const { data: questions, pending, error} = useCollection<Question>(query(collection(db, "questions"), orderBy("createdAt", "desc")), { ssrKey: "questions" });

    return { questions, pending, error };
}