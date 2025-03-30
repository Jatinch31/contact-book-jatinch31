<script setup>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <a-layout style="min-height: 100vh;">
      <a-layout-header>
        <div class="logo" style="justify-content: center;">
          <a href="/" class="title-link">
            <h1 style="color: white">Contact Book</h1>
          </a>
        </div>
      </a-layout-header>

      <a-layout-content style="padding: 20px;">
        <RouterView />
      </a-layout-content>

      <a-layout-footer style="text-align: center; background-color: #001529; color: white;">
        <p style="margin: 0;padding: 0;">© 2025 Contact Book App</p>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  height: 100vh;
}

.logo {
  height: 64px;
  background-color: #001529;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.title-link {
  color: white;
  text-decoration: none;
}

a-layout-header {
  background-color: #001529;
}

a-layout-footer {
  background-color: #001529;
  color: white;
}

a-layout-content {
  background: #fff;
  padding: 24px;
  min-height: 280px;
}
</style>
