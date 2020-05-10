<template>
<div id="sidebar-layout" :class="{ 'sidebar_hide': !sidebarVisible }">
  <nav id="sidebar-navigation">
    <ul id="sidebar-list">
      <li id="sidebar-title">Web Utils</li>
      <li class="list-item" v-for="route in routeArr" :key="route.name">
        <router-link :to="route.route">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
  <button id="btn-toggle-sidebar" @click="toggleSidebar()">MENU</button>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      show: true,
      sidebarVisible: true,
    }
  },
  props: {
    routeArr: Array,
  },
  methods: {
    test() {
      if (this.show)
      
        document.getElementById("sidebar").style.width="200px";
      this.show = !this.show;
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

#sidebar {
  &-layout {
    height: 100%;
    position: absolute;
    transition: ease .5s;
    z-index: 2;
  }

  // hide sidebar
  @at-root .sidebar_hide {
    transform: translateX(-12rem);
    
    #sidebar-navigation {
      box-shadow: none;
    }
  }

  // sidebar title
  &-title {
    padding: {
      top: 20px;
      bottom: 24px;
      left: 12px;
      right: 8px;
    }
    font-weight: bolder;
  }

  // link layout
  &-navigation {
    width: 12rem;
    height: 100%;
    background-color: $colorBlack;
    float: left;
    color: $colorWhite;
    font-size: 1.2em;
    box-shadow: 2px 0 1px $colorBlack+88;

    a {
      display: block;
      color: $colorWhite;
      padding: {
        top: 8px;
        bottom: 8px;
        left: 4px;
        right: 6px;
      }
    }
  }
  // link list
  &-list {
    padding-left: 0;
    margin: 0;
    list-style: none;
    
    // list item
    @at-root .list-item {
      padding: 2px 0;
    }
  }
}

#btn-toggle-sidebar {
  margin-left: 4px;
}

// router selector
.router-link {
  &-exact-active {
    background-color: $colorWhite;
    color: $colorBlack !important;
    font-weight: bold;
    &::before {
      content: "> ";
    }
  }
}
</style>
