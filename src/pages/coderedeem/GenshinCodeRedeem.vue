<script>
import { ref } from 'vue';
import GenshinCodeRedeemDashboard from '/src/partials/dashboard/GenshinCodeRedeemDashboard.vue';

export default {
  name: 'GenshinCodeRedeemPage',
  components: {
    GenshinCodeRedeemDashboard,
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
    <GenshinCodeRedeemDashboard />
  </div>
</template>


