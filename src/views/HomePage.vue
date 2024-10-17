<template>
  <BaseLayout>
    <template #body>
      <!-- <div v-if="!musicianData || loading">
        <p>Carregando...</p>
      </div> -->
      <p>Participe:</p>

      <Lecture
        v-for="lecture in lectures"
        :key="lecture.title"
        :order="lecture.order"
        :title="lecture.title"
        :description="lecture.description"
        :disabled="new Date().toLocaleDateString() !== lecture.date"
        @click="goToLecturePage"
      />
    </template>
  </BaseLayout>
</template>

<script>
import { db } from "../firebase.js";
import {
  addDoc,
  orderBy,
  query,
  deleteDoc,
  doc,
  collection,
} from "firebase/firestore";
import Lecture from "../components/Lecture.vue";
import BaseLayout from "../layout/BaseLayout.vue";
import { toRaw } from "vue";

export default {
  components: {
    BaseLayout,
    Lecture,
  },
  name: "RequestPage",
  data() {
    return {
      showAddRequestModal: false,
      showDeleteRequestModal: false,
      showGetUserNameModal: false,
      songSelected: "",
      loading: false,
      // requestsCollection: useCollection(
      //   query(collection(db, "requests"), orderBy("created_at", "desc")),
      //   { ssrKey: "requests" }
      // ),
      // allMusicians: useCollection(query(collection(db, "musicians")), {
      //   ssrKey: "musicians",
      // }),
      lectures: [
        {
          date: "22/10/24",
          order: 1,
          title: "A hora da verdade!",
          description:
            "As dúvidas mais comuns entre os gestores de frotas desvendadas pelos experts do setor automotivo.",
        },
        {
          date: "17/10/2024",
          order: 2,
          title: "Muito além dos carros: locação 360º",
          description:
            "Um debate amplo e profundo sobre terceirização de frotas e a reinvenção das locadoras para atender um mercado exigente prezando pela experiência completa do cliente.",
        },
      ],
    };
  },
  computed: {
    songsRequested() {
      return this.requestsCollection;
    },
    musicianData() {
      return toRaw(
        this.allMusicians.filter(
          (musician) => musician.id === "Xt6beIx05Q6nFzpREY9q"
        )[0]
      );
    },
    musicianIsLive() {
      return this.musicianData.is_live;
    },
  },
  mounted() {
    console.log(new Date().toLocaleDateString());
    if (!localStorage.getItem("userName")) {
      this.showGetUserNameModal = true;
    }
  },
  methods: {
    openAddRequestModal() {
      this.showAddRequestModal = true;
    },
    closeAddRequestModal() {
      this.showAddRequestModal = false;
    },
    openDeleteRequestModal(songRequestedId) {
      // this.showDeleteRequestModal = true;
      // this.songSelected = songRequestedId;
    },
    closeDeleteRequestModal() {
      this.showDeleteRequestModal = false;
    },
    addSongRequest(songRequested, songRequestedComment) {
      this.closeAddRequestModal();

      this.loading = true;

      addDoc(collection(db, "requests"), {
        user_id: 1,
        user_name: localStorage.getItem("userName") || "",
        song_artist: songRequested,
        song_comment: songRequestedComment,
        status: "pending",
        created_at: new Date(),
      }).then(() => (this.loading = false));
    },
    async deleteSongRequest() {
      this.closeDeleteRequestModal();
      this.loading = true;

      await deleteDoc(doc(db, "requests", this.songSelected))
        .then(() => (this.loading = false))
        .catch(() => (this.loading = false));
    },
    getUserName(userName) {
      localStorage.setItem("userName", userName);

      this.showGetUserNameModal = false;
    },
    goToLecturePage() {
      this.$router.push("/lecture");
    }
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-top: 0;
}

p {
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}

span {
  font-family: inherit;
  font-size: 1.7rem;
  font-style: normal;
  text-decoration: underline;
  text-decoration-color: #2bb41e;
  margin: 0;
}

strong {
  font-size: 1.7rem;
  font-weight: 700;
  font-style: italic;
}

.input-container {
  width: 100%;
  display: flex;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

input {
  border: none;
  border-bottom: 1px solid #aaa;
  -webkit-appearance: none;
  outline: none;
}

.open-modal-request-button {
  background-color: #aaa;
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.3rem;
  width: 80%;
}

.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 20px;
  bottom: 0;
  left: 0;
  margin-top: auto;
}

.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.contact-text {
  font-family: "Playfair Display", sans-serif;
  font-size: 1.5rem;
  margin: 10px;
  font-weight: 500;
}

.contact-info {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 1.2rem;
  margin: 5px;
  font-weight: 500;
}

.divider {
  width: 90%;
  height: 1px;
  background-color: #eaeaea;
  margin-top: 20px;
}

button,
input {
  border: none;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
}
</style>
