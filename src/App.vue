<template>
  <v-app>
    <NavigationBar />

    <v-content>
      <v-progress-linear :value="progressBar" color="primary"></v-progress-linear>
      <transition
        name="router-anim"
        :enter-active-class="enterClass"
        :leave-active-class="leaveClass"
      >
        <router-view class="ma-12"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
  },
  computed: {
    ...mapGetters([
      'progressBar',
      'enterClass',
      'leaveClass',
    ]),
  },
};
</script>

<style>
  .page {
    position: fixed;
  }
</style>
