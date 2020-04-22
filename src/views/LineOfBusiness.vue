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
                v-model="lineOfBusiness"
                :items="items"
                :error-messages="errors"
                :hint="items.descricao"
                item-text="nome"
                item-value="id"
                label="Ramo de Atuação"
                v-on:change="changeStatus(4)"
                persistent-hint
                single-line
                return-object
                required
              ></v-select>
            </ValidationProvider>

            <br><br><br><br>

            <v-btn
              color="primary"
              v-on:click="validateInformation(); nextPage();"
              :disabled="!releaseButton4"
            >
              Avançar
            </v-btn>
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
import { mapMutations, mapGetters } from 'vuex';

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
    items: [
      {
        id_atividade_empresa: 25,
        nome: 'Academias e Locais para pratica de Esporte',
        descricao: 'Academias e Locais para pratica de Esporte',
      },
      {
        id_atividade_empresa: 65,
        nome: 'Agro Veterinária',
        descricao: 'Loja que atende ao mercado consumidor do setor veterinário (grandes animais) e pragas urbanas',
      },
      {
        id_atividade_empresa: 60,
        nome: 'Artesanato',
        descricao: 'Venda de produtos, aviamentos, cursos, etc',
      },
    ],
  }),
  computed: {
    lineOfBusiness: {
      get() { return this.$store.getters.lineOfBusiness; },
      set(newValue) { return this.$store.dispatch('setLineOfBusiness', newValue); },
    },
    ...mapGetters([
      'releaseButton4',
    ]),
  },
  methods: {
    validateInformation() {
      this.$refs.observer.validate();
    },
    ...mapMutations([
      'nextPage',
      'changeStatus',
    ]),
  },
};
</script>
