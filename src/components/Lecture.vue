<template>
  <div :class="`lecture ${disabled && 'disabled'}`">
    <p class="lecture-date">{{order}}º dia</p>
    <div class="lecture-details">
      <div>
        <p class="lecture-title">{{ title }}</p>
        <p class="lecture-description">
          {{ description }}
        </p>
      </div>
      <i
        class="pi pi-arrow-circle-right"
        style="font-size: 1.5rem; color: #0aafa6"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lecture",
  props: {
    order: Number,
    title: String,
    description: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.lecture {
  background-color: #fff;
  width: 90%;
  border-radius: 18px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  color: #06062a;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
}

p {
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  color: #06062a;
}

.lecture-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.lecture-date {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #0aafa6;
}

.lecture-title,
.lecture-description {
  margin: 0;
}

.lecture-description {
  font-size: 1rem;
  margin-right: 30px;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

i {
  margin-left: 10px;
  position: absolute;
  right: 10px;
  top: 43%;
}
</style>
