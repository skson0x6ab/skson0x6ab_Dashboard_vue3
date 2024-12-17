<script>
import { ref } from 'vue';
import GenshinCodeRedeemDashboard from '/src/partials/dashboard/GenshinCodeRedeemDashboard.vue';
import StarRailCodeRedeemDashboard from '/src/partials/dashboard/StarRailCodeRedeemDashboard.vue';
import ZenlessCodeRedeemDashboard from '/src/partials/dashboard/ZenlessCodeRedeemDashboard.vue';

export default {
  name: 'GenshinCodeRedeemPage',
  components: {
    GenshinCodeRedeemDashboard,
    StarRailCodeRedeemDashboard,
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
  <div class="grid grid-cols-3 gap-6">
    <GenshinCodeRedeemDashboard />
    <StarRailCodeRedeemDashboard />
    <ZenlessCodeRedeemDashboard />
  </div>
</template>


