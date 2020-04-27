<template>
  <v-container class="page indigo--text text--darken-4">
    <v-row class="text-left mx-12">
      <v-col cols="12">
        <h2 class="display-1 mb-6">
          <span class="font-weight-bold">
            Milhares de pequenas empresas já contrataram o BITIS.
          </span>
        </h2>

        <h3 class="headline grey--text mb-8">
          O plano ideal para seu negócio é:
        </h3>
      </v-col>

      <v-col cols="8">
        <v-card class="d-inline-block mx-auto">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-card-title class="justify-center">
                  {{ plan }}
                </v-card-title>

                <v-list-item v-for="(item, i) in items" :key="`completo_${i}`">
                  <v-list-item-icon>
                    <v-icon color="secondary" x-small>mdi-checkbox-blank-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn text color="disabled" v-on:click="changePlan()">Trocar plano</v-btn>
                </v-card-actions>
              </v-col>

              <v-col cols="auto">
                <v-card-title class="green--text text--accent-3 justify-center">
                  R$ {{ price }} <span class="indigo--text text--darken-4">/{{ period }}</span>
                </v-card-title>

                <v-list-item
                  v-for="(item, i) in plusItems"
                  :key="`completo_plus_${i}`"
                  class="font-weight-bold"
                >
                  <v-list-item-icon>
                    <v-icon color="secondary" small>mdi-plus</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="d-inline-block mx-auto">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-card-title class="green--text text--accent-3">
                  <v-icon class="green--text text--accent-3">mdi-lock</v-icon>
                  Ambiente seguro
                </v-card-title>

                <ValidationObserver ref="observer">
                  <form>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Forma de pagamento"
                      rules="required"
                    >
                      <v-select
                        v-model="formOfPayment"
                        :items="chooseItems"
                        :error-messages="errors"
                        label="Forma de Pagamento"
                        v-on:change="changeStatus(2)"
                        single-line
                        required
                      ></v-select>
                    </ValidationProvider>

                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Nome do titular"
                      rules="required|max:100"
                    >
                      <v-text-field
                        v-model="cardholder"
                        :error-messages="errors"
                        v-on:keyup="changeStatus(2)"
                        label="Nome do titular"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Número do Cartão"
                      rules="required|max:19"
                    >
                      <v-text-field
                        v-model="cardNumber"
                        :error-messages="errors"
                        label="Número"
                        v-mask="'####.####.####.####'"
                        placeholder="____.____.____.____"
                        required
                      >
                        <template v-slot:append>
                          <img width="40" height="30" src="https://repositorio-bitis.s3-sa-east-1.amazonaws.com/imagens_cad_autoservice/mastercard.png" alt="Mastercard">
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                  </form>
                </ValidationObserver>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-btn
          color="primary"
          v-on:click="validateInformation(); nextPage();"
          :disabled="!releaseButton4"
          class=""
        >
          Avançar
        </v-btn>
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
  data: () => ({
    items: [
      { text: 'Usuários ilimitados' },
      { text: 'NF de produto ilimitadas' },
      { text: 'NF de serviço ilimitadas' },
      { text: 'NFC-e ilimitadas' },
      { text: 'MDF-e ilimitadas' },
      { text: 'SAT ilimitadas' },
      { text: 'Suporte gratuito' },
      { text: 'Integração com contador' },
    ],
    plusItems: [
      { text: 'Controle de estoque', active: true },
      { text: 'Controle de vendas', active: true },
      { text: 'Controle financeiro', active: false },
      { text: 'Estatísticas', active: false },
      { text: 'Muito mais', active: false },
    ],
    chooseItems: [
      'Cartão de Crédito',
      'Boleto',
    ],
  }),
  computed: {
    ...mapGetters([
      'plan',
      'price',
      'period',
      'formOfPayment',
      'cardholder',
      'cardNumber',
      'cardExpiringDate',
      'cvv',
    ]),
  },
  methods: {
    ...mapMutations([
      'changePlan',
      'nextPage',
      'changeStatus',
    ]),
  },
};
</script>
