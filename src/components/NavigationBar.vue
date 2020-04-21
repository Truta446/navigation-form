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

    <v-btn
      color="white"
      depressed
      small
      :to="{ path: `/${index}` }"
      :disabled="!buttonShowPrev"
    >
      <v-icon color="primary" size="30" v-on:click="previousPage()" class="mr-2">
        mdi-chevron-left-circle-outline
      </v-icon>
    </v-btn>
    <v-btn
      small
      color="white"
      depressed
      :to="{ path: `/${index}` }"
      :disabled="!buttonShowNext"
    >
      <v-icon color="primary" size="30" v-on:click="nextPage()" class="mr-6">
        mdi-chevron-right-circle-outline
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      index: (state) => state.index,
      buttonShowPrev: (state) => state.buttonShowPrev,
      buttonShowNext: (state) => state.buttonShowNext,
    }),
  },
  methods: {
    ...mapMutations([
      'previousPage',
      'nextPage',
    ]),
  },
};
</script>
