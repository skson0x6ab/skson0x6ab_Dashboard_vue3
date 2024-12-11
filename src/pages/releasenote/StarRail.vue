<script>
import { ref } from 'vue';
import StarRailDashboard from '/src/partials/dashboard/StarRailDashboard.vue';

export default {
  name: 'StarRailPage',  // 페이지 이름 정의
  components: {
    StarRailDashboard,  // 컴포넌트를 등록
    // 다른 컴포넌트들...
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
    <StarRailDashboard />
  </div>
</template>


