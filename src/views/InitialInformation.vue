<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left ma-12">
      <v-col cols="12">
        <h2 class="display-2 mb-12">
          Você irá utilizar o <span class="font-weight-bold">{{ system }}</span> para:
        </h2>

        <v-btn color="white" class="mr-12 mb-12" v-on:click="changeCategory(true)">
          <v-icon color="primary" class="mr-3">
            mdi-account
          </v-icon>
          Pessoa Física
        </v-btn>

        <v-btn color="white" class="ml-12 mb-12" v-on:click="changeCategory(false)">
          <v-icon color="primary" class="mr-3">
            mdi-factory
          </v-icon>
          Pessoa Jurídica
        </v-btn>

        <h2 class="my-12">
          Informe o <span class="font-weight-bold">{{ label }}</span>
        </h2>

        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider v-slot="{ errors }" :name="label" rules="required|max:18">
              <v-text-field
                :label="label"
                :placeholder="placeholder"
                :error-messages="errors"
                v-model="cpfOrCnpj"
                v-mask="`${maskProperty}`"
                v-on:keyup="changeStatus(2)"
                required
              ></v-text-field>
            </ValidationProvider>

            <br><br><br><br>

            <v-btn
              color="primary"
              v-on:click="validateInformation(); sendReceitaWS(); nextPage();"
              :disabled="!releaseButton2"
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
import { required, max } from 'vee-validate/dist/rules';
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    cpfOrCnpj: {
      get() { return this.$store.getters.cpfOrCnpj; },
      set(newValue) { return this.$store.dispatch('setCpfOrCnpj', newValue); },
    },
    ...mapGetters([
      'releaseButton2',
      'system',
      'placeholder',
      'label',
      'maskProperty',
    ]),
  },
  methods: {
    validateInformation() {
      this.$refs.observer.validate();
    },
    ...mapMutations([
      'sendReceitaWS',
      'changeCategory',
      'nextPage',
      'changeStatus',
    ]),
  },
};
</script>
