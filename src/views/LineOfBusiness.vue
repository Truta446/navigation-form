<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left ma-12">
      <v-col cols="12">
        <h3 class="display-1 my-12">
          Informe o <span class="font-weight-bold">RAMO DE ATUAÇÃO</span> da empresa
          para um atendimento personalizado e, clique em avançar
        </h3>

        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider v-slot="{ errors }" name="Ramo de Atuação" rules="required">
              <v-select
                v-model="select"
                :items="lineOfBusiness"
                :error-messages="errors"
                label="Ramo de Atuação"
                required
              ></v-select>
            </ValidationProvider>

            <br><br><br><br>

            <v-btn color="primary" v-on:click="nextPage()">Avançar</v-btn>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} não pode ficar em branco.',
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    lineOfBusiness: [],
  }),
  methods: {
    nextPage() {
      this.$refs.observer.validate();
    },
  },
};
</script>
