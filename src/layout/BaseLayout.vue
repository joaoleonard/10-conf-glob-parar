<template>
  <div class="container">
    <header @click="goToHomePage">
      <img src="../assets/CONF-verde.png" alt="Logo" />
      <div class="divisor" />
    </header>
    <main>
      <slot name="body" />
    </main>
  </div>
  <slot name="modals" />
</template>

<script>
export default {
  name: "BaseLayout",
  methods: {
    goToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  left: 0;
  background-color: #fff;
  cursor: pointer;
}

.container {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
}

header {
  position: relative;
  background-color: #02434c;
  height: 7rem;
}

.divisor {
  width: 90%;
  height: 1px;
  background-color: #eaeaea;
  position: absolute;
  bottom: 0;
}

img {
  width: 60vw;
  position: absolute;
  top: 0;
  max-width: 300px;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  padding-bottom: 40px;
  height: 100%;
}
</style>
