<script>
import { ref } from 'vue';
import MaplestoryDashboard from '/src/partials/dashboard/MaplestoryDashboard.vue';

export default {
  name: 'MaplestoryPage',
  components: {
    MaplestoryDashboard,
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
    <MaplestoryDashboard />
  </div>
</template>


