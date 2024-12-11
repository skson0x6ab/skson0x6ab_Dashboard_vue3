<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Main content area -->
      <main class="main-content px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
        <router-view /> <!-- Dynamic content goes here -->
      </main>

    </div>
  </div>
</template>

<script>
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
import Banner from '../partials/Banner.vue';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Header,
    Banner,
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
};
</script>
