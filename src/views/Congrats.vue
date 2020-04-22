<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left ma-12">
      <v-col cols="8">
        <h2 class="display-2 mt-12">
          Parabéns, <span class="font-weight-bold">{{ personalName }}</span>!
        </h2>

        <h2 class="display-2 mt-12">
          Chegamos a etapa final
        </h2>
      </v-col>

      <v-col cols="4">
        <v-img
          alt="Envelope"
          class="shrink ml-12 mt-4"
          contain
          src="https://repositorio-bitis.s3-sa-east-1.amazonaws.com/imagens_cad_autoservice/envelope.png"
          transition="scale-transition"
          width="200"
        />
      </v-col>

      <v-col cols="12">
        <p class="headline mt-12">
          Para acessar o sistema, confirme seu cadastro através do e-mail enviado para:
        </p>

        <p class="headline mt-12">
          <span class="font-weight-bold">{{ personalEmail }}</span>
        </p>


        <p class="caption mt-12 red--text">
          Não esqueça de verificar sua caixa de spam!
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'personalName',
      'personalEmail',
    ]),
  },
};
</script>
