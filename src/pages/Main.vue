<template>
  <div class="main-layout">
    <h1 class="main-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  data() {
    return {
      title: "WEB UTILS",
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

.main-layout {
  height: 100%;
  background-color: $colorPrimary;
  color: $colorAccent;
}
.main-title {
  margin: 0;
  padding: {
    right: 1.6rem;
    top: 0.4rem;
  };
  font-family: serif;
  font-size: 8rem;
  text-align: right;
  line-height: 8rem;
  letter-spacing: 0.4rem;
  font-kerning: auto;
}
</style>
