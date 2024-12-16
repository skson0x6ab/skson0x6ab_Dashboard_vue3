<script>
import { ref } from 'vue';
import StarRailCodeRedeemDashboard from '/src/partials/dashboard/StarRailCodeRedeemDashboard.vue';

export default {
  name: 'StarRailCodeRedeemPage',
  components: {
    StarRailCodeRedeemDashboard,
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
    <StarRailCodeRedeemDashboard />
  </div>
</template>


