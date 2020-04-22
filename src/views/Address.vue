<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left ma-12">
      <v-col cols="8">
        <h3 class="display-1 mb-12">
          Verifique se o <span class="font-weight-bold">ENDEREÇO</span> abaixo esta
          correto e, clique em concluir cadastro
        </h3>

        <ValidationObserver ref="observer">
          <form>
            <v-flex xs12 sm5>
              <ValidationProvider v-slot="{ errors }" name="CEP" rules="required|max:9">
                <v-text-field
                  v-model="cep"
                  :error-messages="errors"
                  label="CEP"
                  v-mask="'#####-###'"
                  placeholder="_____-___"
                  v-on:keyup="sendViaCep(); changeStatus(5)"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-flex>

            <br>

            <p class="headline mb-12">
              {{ street }},
              <v-flex sm3>
                <v-text-field
                  v-model="number"
                  placeholder="Número"
                ></v-text-field>
              </v-flex>
              <v-flex sm5>
                <v-text-field
                  v-model="compl"
                  placeholder="Complemento"
                ></v-text-field>
              </v-flex>, {{ district }},
              {{ city }}, {{ state }}
            </p>

            <br><br>

            <v-btn
              color="primary"
              v-on:click="validateInformation(); nextPage();"
              :disabled="!releaseButton5"
            >
              Concluir Cadastro
            </v-btn>
          </form>
        </ValidationObserver>
      </v-col>

      <v-col cols="4" class="mt-12">
        <v-img
          alt="Map"
          class="shrink ma-12"
          contain
          src="https://repositorio-bitis.s3-sa-east-1.amazonaws.com/imagens_cad_autoservice/mapa.png"
          transition="scale-transition"
          width="250"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';
import { mapGetters, mapMutations } from 'vuex';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} não pode ficar em branco.',
});

extend('max', {
  ...max,
  message: '{_field_} não pode ter mais do que {length} caracteres.',
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    cep: {
      get() { return this.$store.getters.cep; },
      set(newValue) { return this.$store.dispatch('setCep', newValue); },
    },
    number: {
      get() { return this.$store.getters.number; },
      set(newValue) { return this.$store.dispatch('setNumber', newValue); },
    },
    compl: {
      get() { return this.$store.getters.compl; },
      set(newValue) { return this.$store.dispatch('setCompl', newValue); },
    },
    ...mapGetters([
      'releaseButton5',
      'street',
      'district',
      'city',
      'state',
    ]),
  },
  methods: {
    validateInformation() {
      this.$refs.observer.validate();
    },
    ...mapMutations([
      'nextPage',
      'changeStatus',
      'sendViaCep',
    ]),
  },
};
</script>
