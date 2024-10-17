<template>
  <div class="question-container">
    <div class="user-info">
      <p class="name">{{ question.name }}</p>
      <p class="company">{{ question.company }}</p>
    </div>
    <p class="question">{{ question.question }}</p>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: Object,
  },
};
</script>

<style scoped>
.question-container {
  background-color: #fff;
  width: 80vw;
  border-radius: 18px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #06062a;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}

.name {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: #0aafa6;
}

.company {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: #0aafa6;
}

.question {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  text-align: justify;
}

p {
  font-weight: 600;
  margin: 0;
}
</style>
