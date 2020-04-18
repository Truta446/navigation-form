<template>
  <v-app>
    <NavigationBar />

    <v-content>
      <v-progress-linear :value="progressBar" color="primary"></v-progress-linear>
      <transition
        name="router-anim"
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutLeft"
      >
        <router-view class="ma-12"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    progressBar: 15,
  }),
  mathods: {

  },
};
</script>

<style>
  .page {
    position: fixed;
    width: inherit;
  }
</style>
