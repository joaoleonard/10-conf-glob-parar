import { createStore } from "vuex";

export default createStore({
  state: {
    lectures: [
      // {
      //   id: 1,
      //   title: "A hora da verdade!",
      //   description:
      //     "As dúvidas mais comuns entre os gestores de frotas desvendadas pelos experts do setor automotivo.",
      // },
      {
        id: 2,
        title:
          "Desvendando mitos: tecnologia como prova na Justiça do Trabalho",
        description:
          "Especialista revela como dados digitais e sistemas avançados podem se transformar em provas irrefutáveis na gestão de frotas.",
      },
      {
        id: 3,
        title: "Vida real: eletrificação de frotas de Norte a Sul do Brasil",
        description:
          "Ouça de gestores que já estão trabalhando com elétricos os desafios práticos na hora de rodar com a frota pelas estradas do Brasil.",
      },
    ],
  },
  mutations: {},
  getters: {},
  actions: {},
});
