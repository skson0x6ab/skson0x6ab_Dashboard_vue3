<script>
import { ref } from 'vue';
import ZenlessZoneZeroDashboard from '/src/partials/dashboard/ZenlessZoneZeroDashboard.vue';

export default {
  name: 'ZenlessZoneZeroPage',
  components: {
    ZenlessZoneZeroDashboard,
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
    <ZenlessZoneZeroDashboard />
  </div>
</template>


