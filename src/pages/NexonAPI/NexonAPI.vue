<script>
import { ref } from 'vue';
import NexonAPIDashboard from '/src/partials/dashboard/NexonAPIDashboard.vue';

export default {
  name: 'NexonAPI',
  components: {
    NexonAPIDashboard,
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
    <NexonAPIDashboard />
  </div>
</template>


