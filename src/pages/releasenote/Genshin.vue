<script>
import { ref } from 'vue';
import GenshinDashboard from '/src/partials/dashboard/GenshinDashboard.vue';

export default {
  name: 'GenshinPage',
  components: {
    GenshinDashboard,
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
    <GenshinDashboard />
  </div>
</template>


