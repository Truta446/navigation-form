<template>
  <v-container class="page">
    <v-row class="text-left ma-12">
      <v-col cols="12">
        <h2 class="display-2 mb-12">
          Você irá utilizar o <span class="font-weight-bold">{{ companyName }}</span> para:
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

        <v-text-field
          :label="label"
          :placeholder="placeholder"
          :counter="counter"
          return-masked-value
          :mask="mask"
        >
        </v-text-field>

        <br><br><br><br>

        <v-btn color="primary" v-on:click="nextPage()">Avançar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    companyName: 'BITIS',
    placeholder: '___.___.___-__',
    label: 'CPF',
    counter: 14,
    mask: '###.###.###-##',
  }),
  methods: {
    changeCategory(isCPF) {
      if (isCPF) {
        this.placeholder = '___.___.___-__';
        this.label = 'CPF';
        this.counter = 14;
        this.mask = '###.###.###-##';
      } else {
        this.placeholder = '__.___.___/____-__';
        this.label = 'CNPJ';
        this.counter = 18;
        this.mask = '##.###.###/####-##';
      }
    },
  },
};
</script>
