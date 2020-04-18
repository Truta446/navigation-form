<template>
  <v-container class="page indigo--text text--darken-4
  ">
    <v-row class="text-left ma-12">
      <v-col cols="8">
        <h2 class="display-2 mt-12">
          Olá <span class="font-weight-bold">{{ name }}</span>,
        </h2>

        <h2 class="display-2 mb-12">
          estamos contentes que decidiu se juntar à familia BITIS.
        </h2>

        <h3 class="mb-12">
          Agora precisamos de algumas informações para ajudá-lo a prosperar com
          uso inteligente das informações através de alta tecnologia.
        </h3>

        <br><br><br><br>

        <v-btn color="primary" v-on:click="nextPage()">Começar</v-btn>
      </v-col>

      <v-col cols="4" class="mt-12">
        <v-img
          alt="Cellphone"
          class="shrink ma-12"
          contain
          src="https://repositorio-bitis.s3-sa-east-1.amazonaws.com/imagens_cad_autoservice/smartphone.png"
          transition="scale-transition"
          width="250"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: 'Alisson Barrison',
  }),
  methods: {
    nextPage: () => {
      console.log('oi');
    },
  },
};
</script>
