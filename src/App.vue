<template>
  <div id="app">
    <Sidebar v-bind:routeArr="routeArr" />
    <router-view id="router"></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data() {
    return {
      routeArr: [
        { route: "/", name: "Home" },
        { route: "/timer", name: "Timer" },
        { route: "/todo",  name: "Todo" },
      ]
    }
  }
}
</script>

<style lang="scss">
@import './styles/colors.scss';
@import './styles/global.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
}

#router {
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
