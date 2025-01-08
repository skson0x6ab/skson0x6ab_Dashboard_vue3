<script>
import { ref } from 'vue';
import loginComponent from '/src/partials/login/loginComponent.vue';

export default {
  name: 'loginComponent',
  components: {
    loginComponent,
  },
};
</script>

<template>
  <div class="grid">
    <loginComponent />
  </div>
</template>
