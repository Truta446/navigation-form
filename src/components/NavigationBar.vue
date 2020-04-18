<template>
  <v-app-bar
    app
    color="white"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="BITIS Logo"
        class="shrink mr-2"
        contain
        src="https://repositorio-bitis.s3-sa-east-1.amazonaws.com/imagens_cad_autoservice/logobitis.png"
        transition="scale-transition"
        width="120"
      />
    </div>

    <v-spacer></v-spacer>

    <router-link :to="{ path: `/${index}` }">
      <v-icon color="disabled" v-on:click="previousPage()">
        mdi-chevron-left-circle-outline
      </v-icon>
    </router-link>
    <router-link :to="{ path: `/${index}` }">
      <v-icon color="primary" v-on:click="nextPage()">
        mdi-chevron-right-circle-outline
      </v-icon>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    index: '',
  }),
  methods: {
    previousPage() {
      if (this.index === '') {
        return;
      }

      this.index--;

      if (this.index === 1) {
        this.index = '';
      }
    },
    nextPage() {
      if (this.index === '') {
        this.index = 1;
      }

      this.index++;

      if (this.index === 7) {
        this.index = 6;
      }
    },
  },
};
</script>
