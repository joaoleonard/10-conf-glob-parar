<template>
  <BaseLayout>
    <template #body>
      <p>Selecione a palestra ativa:</p>

      <select
        type="select"
        :value="activeLectureId"
        @change="(l) => changeActiveLecture(l)"
      >
        <option value="0" selected>Nenhuma</option>
        <option
          v-for="lecture in lectures"
          :value="lecture.id"
          :key="lecture.id"
        >
          {{ lecture.title }}
        </option>
      </select>

      <button @click="openDeleteQuestionsModal">Deletar todas as perguntas</button>
    </template>
    <template #modals>
      <DeleteQuestionsModal
        v-show="showDeleteQuestionsModal"
        @close="closeDeleteQuestionsModal"
        @confirm="deleteAllQuestions"
      />
    </template>
  </BaseLayout>
</template>

<script>
import { db } from "../firebase.js";
import { addDoc, query, deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import Lecture from "../components/Lecture.vue";
import BaseLayout from "../layout/BaseLayout.vue";
import { useCollection } from "vuefire";
import DeleteQuestionsModal from "../components/modals/DeleteQuestionsModal.vue";

export default {
  components: {
    BaseLayout,
    Lecture,
    DeleteQuestionsModal
  },
  name: "RequestPage",
  data() {
    return {
      showDeleteQuestionsModal: false,
      lectures: this.$store.state.lectures,
      activeLecture: useCollection(query(collection(db, "config")), {
        ssrKey: "config",
      }),
    };
  },
  computed: {
    activeLectureId() {
      if (!this.activeLecture[0]) return 0;

      return this.activeLecture[0].activeLectureId;
    },
  },
  methods: {
    openDeleteQuestionsModal() {
      this.showDeleteQuestionsModal = true;
    },
    closeDeleteQuestionsModal() {
      this.showDeleteQuestionsModal = false;
    },
    async deleteAllQuestions() {
      const questionsQuery = query(collection(db, "questions"));
      const querySnapshot = await getDocs(questionsQuery);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      this.showDeleteQuestionsModal = false;
    },
    async changeActiveLecture(event) {
      const lectureId = event.target.value;

      const configRef = doc(db, "config", this.activeLecture[0].id);

      await deleteDoc(configRef);

      await addDoc(collection(db, "config"), {
        activeLectureId: Number(lectureId),
      });
    },
  },
};
</script>

<style scoped>
p {
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: #808080;
  color: #fff;
  border: none;
}

select:focus {
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: #808080;
  color: #fff;
  border: none;
}
</style>
