<template>
    <AuthKeyPopup :popupOpen="popupOpen" :isAuthenticated="isAuthenticated" @update:popupOpen="popupOpen = $event" @update:isAuthenticated="isAuthenticated = $event" />
</template>


<script>
import { ref } from 'vue';
import AuthKeyPopup from '/src/partials/login/loginPopup.vue';

export default {
  name: 'Login',
  components: {
    AuthKeyPopup
  },
};
</script>

