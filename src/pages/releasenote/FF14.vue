<script>
import { ref } from 'vue';
import FF14Dashboard from '/src/partials/dashboard/FF14Dashboard.vue';

export default {
  name: 'FF14Page',
  components: {
    FF14Dashboard,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>

<template>
  <div class="grid">
    <FF14Dashboard />
  </div>
</template>


