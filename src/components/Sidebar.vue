<template>
<div id="sidebar-layout" :class="{ 'sidebar_hide': !sidebarVisible }">
  <!-- navigation body -->
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
  <!-- hamburger button for toggle sidebar -->
  <a id="btn-toggle-sidebar" @click="toggleSidebar()">
    <div id="btn-line-1" :class="{ 'sidebar-opened': sidebarVisible }"></div>
    <div id="btn-line-2"></div>
    <div id="btn-line-3" :class="{ 'sidebar-opened': sidebarVisible }"></div>
  </a>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarVisible: true,
    }
  },
  props: {
    routeArr: Array,
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";

#sidebar {
  // sidebar layout
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
    box-shadow: 2px 0 1px rgba($colorBlack, 0.6);

    @include darkMode {
      background-color: $colorWhite;
      color: $colorBlack;
      box-shadow: 2px 0 1px rgba($colorWhite, 0.6);
    }

    a {
      display: block;
      color: $colorWhite;
      padding: {
        top: 8px;
        bottom: 8px;
        left: 4px;
        right: 6px;
      }

      @include darkMode {
        color: $colorBlack;
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

// sidebar's button
#btn-toggle-sidebar {
  display: inline-block;
  padding: 6px;
  cursor: pointer;

  * {
    width: 32px;
    height: 4px;
    margin: 6px;
    border-radius: 8px;
    background-color: $colorBlack;
    transition: .5s;

    @include darkMode {
      background-color: $colorWhite;
    }
  }

  // transform button
  .sidebar-opened {
    width: 20px;

    &#btn-line-1 {
      transform: translate(-2px, 4px) rotate(-45deg);
    }
    &#btn-line-3 {
      transform: translate(-2px, -4px) rotate(45deg);
    }
  }
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

    @include darkMode {
      background-color: $colorBlack;
      color: $colorWhite !important;
    }
  }
}
</style>
