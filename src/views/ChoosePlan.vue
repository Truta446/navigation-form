<template>
  <v-container fluid class="page indigo--text text--darken-4">
    <v-row justify="space-around">
      <v-col cols="12">
        <v-tabs
          v-model="activeTabPeriod"
          color="indigo darken-4"
          class="elevation-2 rounded-tabs"
          :centered="true"
        >
          <v-tab v-for="i in 4" :key="i" v-on:click="choosenPeriod(i)">
            {{ types[i-1] }}
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="12">
        <v-row
          justify="space-around"
        >
          <v-card
            class="ma-3 pa-6 rounded-card"
            outlined
            tile
          >
            <v-card-title class="justify-center">
              {{ plans[0] }}
            </v-card-title>

            <v-card-title class="green--text text--accent-3 justify-center">
              R$ {{ pricesPerPeriod[0] }}
            </v-card-title>

            <v-list-item v-for="(item, i) in items" :key="`notas_${i}`">
              <v-list-item-icon>
                <v-icon color="secondary" x-small>mdi-checkbox-blank-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                color="primary justify-center"
                v-on:mouseover="changeWord(1, 'Avançar')"
                v-on:mouseleave="changeWord(1, 'Escolher este')"
              >
                {{ wordButton1 }}
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card
            class="ma-3 pa-6 rounded-card"
            outlined
            tile
          >
            <v-card-title class="justify-center">
              {{ plans[1] }}
            </v-card-title>

            <v-card-title class="green--text text--accent-3 justify-center">
              R$ {{ pricesPerPeriod[1] }}
            </v-card-title>

            <v-list-item v-for="(item, i) in items" :key="`pdv_${i}`">
              <v-list-item-icon>
                <v-icon color="secondary" x-small>mdi-checkbox-blank-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(item, i) in plusItems"
              :key="`pdv_plus_${i}`"
              v-if="item.active"
              class="font-weight-bold"
            >
              <v-list-item-icon>
                <v-icon color="secondary" small>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                color="primary"
                v-on:mouseover="changeWord(2, 'Avançar')"
                v-on:mouseleave="changeWord(2, 'Escolher este')"
              >
                {{ wordButton2 }}
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card
            class="ma-3 pa-6 rounded-card"
            outlined
            tile
          >
            <v-card-title class="justify-center">
              {{ plans[2] }}
            </v-card-title>

            <v-card-title class="green--text text--accent-3 justify-center">
              R$ {{ pricesPerPeriod[2] }}
            </v-card-title>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  Ideal para o seu negócio
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-for="(item, i) in items" :key="`completo_${i}`">
              <v-list-item-icon>
                <v-icon color="secondary" x-small>mdi-checkbox-blank-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

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

            <v-card-actions>
              <v-btn
                color="primary"
                v-on:mouseover="changeWord(3, 'Avançar')"
                v-on:mouseleave="changeWord(3, 'Escolher este')"
              >
                {{ wordButton3 }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
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
    wordButton1: 'Escolher este',
    wordButton2: 'Escolher este',
    wordButton3: 'Escolher este',
    plans: ['Somente notas', 'Notas & PDV', 'Completo'],
    types: ['Mensal', 'Trimestral', 'Semestral', 'Anual'],
  }),
  computed: {
    activeTabPeriod: {
      get() { return this.$store.getters.activeTabPeriod; },
      set(newValue) { return this.$store.dispatch('setActiveTabPeriod', newValue); },
    },
    ...mapGetters([
      'pricesPerPeriod',
    ]),
  },
  methods: {
    changeWord(n, word) {
      switch (n) {
        case 1:
          this.wordButton1 = word;
          break;
        case 2:
          this.wordButton2 = word;
          break;
        case 3:
          this.wordButton3 = word;
          break;
        default:
          break;
      }
    },
    ...mapMutations([
      'choosenPeriod',
    ]),
  },
};
</script>

<style scoped>
  .rounded-card {
    border-radius:10px;
  }
  .rounded-tabs {
    border-radius:80px;
  }
</style>
