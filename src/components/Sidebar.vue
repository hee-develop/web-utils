<template>
  <nav id="sidebar">
    <ul id="side-link-list">
      <li v-for="route in routeArr" :key="route.name">
        <router-link :to="route.route">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    routeArr: Array,
  }
}
</script>

<style scoped>
/* sidebar */
#sidebar {
  width: 12rem;
  height: 100%;
  border-right: 1px solid #DDD;
  float: left;
}
#side-link-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
#side-link-list li {
  padding: 8px 4px;
}
.router-link-exact-active {
  font-weight: bold;
}
.router-link-exact-active::before {
  content: "► ";
}
</style>
