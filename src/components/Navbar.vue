<template>
  <div class="main-navbar z-depth-3">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to=" {name: 'Index'} ">
          <span class="nav-title">SMOOTHIES</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
 </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.main-navbar nav {
  padding: 0 20px;
}
</style>
