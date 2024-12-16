<script>
import { ref } from 'vue';
import ZenlessCodeRedeemDashboard from '/src/partials/dashboard/ZenlessCodeRedeemDashboard.vue';

export default {
  name: 'ZenlessCodeRedeemPage',
  components: {
    ZenlessCodeRedeemDashboard,
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
    <ZenlessCodeRedeemDashboard />
  </div>
</template>


