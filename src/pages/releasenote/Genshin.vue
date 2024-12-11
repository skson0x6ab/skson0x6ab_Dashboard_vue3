<script>
import { ref } from 'vue';
import GenshinDashboard from '/src/partials/dashboard/GenshinDashboard.vue';

export default {
  name: 'GenshinPage',  // 페이지 이름 정의
  components: {
    GenshinDashboard,  // 컴포넌트를 등록
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
    <GenshinDashboard />  <!-- GenshinDashboard 사용 -->
  </div>
</template>


