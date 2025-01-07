<script>
import { ref } from 'vue';
import tmpIcon from '/src/partials/tmp/tmpIcon.vue';

export default {
  name: 'TMPPage',
  components: {
    tmpIcon,
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
    <tmpIcon />
  </div>
</template>


