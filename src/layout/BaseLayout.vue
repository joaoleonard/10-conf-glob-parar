<template>
  <header>
    <img src="../assets/CONF-verde.png" alt="Logo" />
    <div class="divisor" />
  </header>
  <main>
    <slot name="body" />
  </main>
  <slot name="modals" />
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>

<style scoped>
header,
footer {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 0;
  left: 0;
  background-color: #fff;
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

h1 {
  font-size: 25px;
  font-family: "Playfair Display", sans-serif;
  background: linear-gradient(to right, #2bb41e, #0aafa6);
  color: transparent;
  background-clip: text;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

footer {
  bottom: 0;
  font-family: "Playfair Display", sans-serif;
  position: fixed;
}
</style>
