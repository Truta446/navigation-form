<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left ma-12">
      <v-col cols="12">
        <h3 class="display-1 mb-12">
          Verifique se as informações da <span class="font-weight-bold">SUA EMPRESA</span>
          estão corretas e, clique em avançar
        </h3>

        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider v-slot="{ errors }" name="Nome fantasia" rules="required|max:100">
              <v-text-field
                v-model="fantasyName"
                :error-messages="errors"
                v-on:keyup="changeStatus(3)"
                label="Nome fantasia"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Razão Social" rules="required|max:100">
              <v-text-field
                v-model="companyName"
                :error-messages="errors"
                v-on:keyup="changeStatus(3)"
                label="Razão Social"
                required
              ></v-text-field>
            </ValidationProvider>
            <v-flex xs12 sm5>
              <ValidationProvider v-slot="{ errors }" name="Telefone" rules="required|max:14">
                <v-text-field
                  v-model="phone"
                  :error-messages="errors"
                  label="Telefone"
                  v-mask="'(##) ####-####'"
                  placeholder="(__) ____-____"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 sm5>
              <ValidationProvider v-slot="{ errors }" name="Celular" rules="required|max:16">
                <v-text-field
                  v-model="cellPhone"
                  :error-messages="errors"
                  label="Celular"
                  v-mask="'(##) # ####-####'"
                  placeholder="(__) _ ____-____"
                  append-icon="mdi-factory"
                  color="success"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|email|max:100">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                v-on:keyup="changeStatus(3)"
                label="E-mail"
              ></v-text-field>
            </ValidationProvider>


            <v-btn
              color="primary"
              v-on:click="validateInformation(); nextPage();"
              :disabled="!releaseButton3"
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
import { required, email, max } from 'vee-validate/dist/rules';
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

extend('max', {
  ...max,
  message: '{_field_} não pode ter mais do que {length} caracteres.',
});

extend('email', {
  ...email,
  message: 'O E-mail precisa ser válido.',
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    fantasyName: {
      get() { return this.$store.getters.fantasyName; },
      set(newValue) { return this.$store.dispatch('setFantasyName', newValue); },
    },
    companyName: {
      get() { return this.$store.getters.companyName; },
      set(newValue) { return this.$store.dispatch('setCompanyName', newValue); },
    },
    phone: {
      get() { return this.$store.getters.phone; },
      set(newValue) { return this.$store.dispatch('setPhone', newValue); },
    },
    cellPhone: {
      get() { return this.$store.getters.cellPhone; },
      set(newValue) { return this.$store.dispatch('setCellPhone', newValue); },
    },
    email: {
      get() { return this.$store.getters.email; },
      set(newValue) { return this.$store.dispatch('setEmail', newValue); },
    },
    ...mapGetters([
      'releaseButton3',
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
