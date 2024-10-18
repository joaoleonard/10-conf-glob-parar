<template>
  <BaseLayout>
    <template #body>
      <button @click="goHome" class="back-button">
        <i
          class="pi pi-arrow-circle-left"
          style="font-size: 1.5rem; color: #fff"
        ></i>
      </button>
      <p>Faça sua pergunta para os palestrantes:</p>

      <button
        class="open-modal-question-button"
        type="submit"
        @click="openAddQuestionModal"
        v-if="!loading"
      >
        Fazer pergunta
      </button>

      <div v-if="loading" class="loading">
        <p>Carregando...</p>
      </div>
      <div v-else-if="!loading && questions.length">
        <p>Lista de perguntas</p>
        <Question
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />
      </div>
      <p v-else>Nenhuma pergunta ainda</p>
    </template>
    <template #modals>
      <AddQuestionModal
        v-show="showAddQuestionModal"
        @close="closeAddQuestionModal"
        @confirm="addQuestion"
      />
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../layout/BaseLayout.vue";
import { db } from "../firebase.js";
import { orderBy, query, collection, where, addDoc } from "firebase/firestore";
import AddQuestionModal from "../components/modals/AddQuestionModal.vue";
import Question from "../components/Question.vue";
import { useCollection } from "vuefire";

export default {
  components: {
    BaseLayout,
    AddQuestionModal,
    Question,
  },
  name: "LecturePage",
  data() {
    return {
      showAddQuestionModal: false,
      loading: false,
      questionsCollection: useCollection(
        query(collection(db, "questions"), orderBy("created_at", "asc")),
        { ssrKey: "questions" }
      ),
      lectureId: localStorage.getItem("selectedLectureId"),
    };
  },
  computed: {
    questions() {
      return this.questionsCollection.filter(
        (question) => question.lectureId === this.lectureId
      );
    },
  },
  methods: {
    openAddQuestionModal() {
      this.showAddQuestionModal = true;
    },
    closeAddQuestionModal() {
      this.showAddQuestionModal = false;
    },
    addQuestion(data) {
      this.closeAddQuestionModal();

      this.loading = true;

      addDoc(collection(db, "questions"), {
        lectureId: this.lectureId,
        name: data.name,
        company: data.company,
        question: data.question,
        date: new Date().toLocaleDateString(),
        created_at: new Date(),
      }).then(() => (this.loading = false));
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.back-button { 
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;
}

p {
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-top: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.open-modal-question-button {
  background-color: #002c39;
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.3rem;
  width: 80%;
  margin-bottom: 15px;
}

button,
input {
  border: none;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
}
</style>
