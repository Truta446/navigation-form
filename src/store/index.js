import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import createPersistedState from 'vuex-persistedstate';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import validEmail from '@secretsofsume/valid-email';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: '',
    buttonShowPrev: false,
    buttonShowNext: true,
    releaseButton2: false,
    releaseButton3: false,
    releaseButton4: false,
    releaseButton5: false,
    enterClass: 'animated fadeInRight',
    leaveClass: 'animated fadeOutLeft',
    system: 'BITIS',
    placeholder: '___.___.___-__',
    label: 'CPF',
    maskProperty: '###.###.###-##',
    progressBar: 0,
    pricesPerPeriod: ['78,00', '149,00', '199,00'],
    activeTabPeriod: '',
    prices: {
      mensal: ['78,00', '149,00', '199,00'],
      trimestral: ['222,30', '424,65', '567,15'],
      semestral: ['421,20', '804,60', '1074,60'],
      anual: ['748,80', '1430,40', '1910,40'],
    },
    personalName: 'Alisson Barison',
    personalEmail: 'reidogado@reidogado.com',
    company: {
      info: {
        cpfOrCnpj: '',
        fantasyName: '',
        companyName: '',
        phone: '',
        cellPhone: '',
        email: '',
        lineOfBusiness: {},
      },
      address: {
        cep: '',
        street: '',
        number: '',
        compl: '',
        district: '',
        city: '',
        state: '',
      },
      paymentPlan: {
        plan: 'Completo',
        price: '199,00',
        period: 'mês',
        formOfPayment: 'Cartão de Crédito',
        cardholder: '',
        cardNumber: '',
        cardExpiringDate: {
          month: moment().format('MM'),
          year: moment().format('YY'),
        },
        cvv: null,
      },
    },
  },
  mutations: {
    previousPage: (state) => {
      if (state.index === '') return;

      state.enterClass = 'animated fadeInLeft';
      state.leaveClass = 'animated fadeOutRight';

      state.index--;

      state.progressBar = (state.index - 1) * 16.66;

      state.buttonShowPrev = state.index !== 1;
      state.buttonShowNext = state.index !== 7;

      if (state.index === 1) {
        state.index = '';
      }

      router.push(`/${state.index}`);
    },
    nextPage: (state) => {
      if (state.index === 7) return;

      if (state.index === '') {
        state.index = 1;
      }

      switch (state.index) {
        case 2:
          if (!state.releaseButton2) return;
          break;
        case 3:
          if (!state.releaseButton3) return;
          break;
        case 4:
          if (!state.releaseButton4) return;
          break;
        case 5:
          if (!state.releaseButton5) return;
          break;
        default:
          break;
      }

      state.index++;

      state.enterClass = 'animated fadeInRight';
      state.leaveClass = 'animated fadeOutLeft';

      state.progressBar = (state.index - 1) * 16.66;

      state.buttonShowPrev = state.index !== 1;
      state.buttonShowNext = state.index !== 7;

      router.push(`/${state.index}`);
    },
    changeStatus: (state, page) => {
      switch (page) {
        case 2:
          if (state.company.info.cpfOrCnpj === '') return;

          if (state.label === 'CPF') {
            if (!cpf.isValid(state.company.info.cpfOrCnpj)) {
              state.releaseButton2 = false;
              return;
            }
          } else if (!cnpj.isValid(state.company.info.cpfOrCnpj)) {
            state.releaseButton2 = false;
            return;
          }

          state.releaseButton2 = true;
          break;
        case 3:
          if (state.company.info.fantasyName === ''
            || state.company.info.companyName === ''
            || state.company.info.email === ''
            || !validEmail(state.company.info.email)
          ) {
            state.releaseButton3 = false;
            return;
          }

          state.releaseButton3 = true;
          break;
        case 4:
          if (state.company.info.lineOfBusiness === '') return;
          state.releaseButton4 = true;
          break;
        case 5:
          if (state.company.address.cep === '') return;
          state.releaseButton5 = true;
          break;
        default:
          break;
      }
    },
    sendReceitaWS: async (state) => {
      if (state.company.info.cpfOrCnpj.length !== 18) return;

      const CNPJ = state.company.info.cpfOrCnpj.replace(/[^\d]+/g, '');

      try {
        const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${CNPJ}`);

        state.company.address.cep = data.cep;
        state.company.address.street = data.logradouro;
        state.company.address.district = data.bairro;
        state.company.address.city = data.municipio;
        state.company.address.state = data.uf;
        state.company.address.number = data.numero;
        state.company.address.compl = data.complemento;
        state.company.info.fantasyName = data.fantasia;
        state.company.info.companyName = data.nome;
        state.company.info.phone = data.telefone.split('/')[0];
        state.company.info.email = data.email;

        state.releaseButton3 = true;
        state.releaseButton5 = true;
      } catch (err) {
        console.log(err);
      }
    },
    sendViaCep: async (state) => {
      if (state.company.address.cep.length !== 9) return;
      const CEP = state.company.address.cep;

      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);

        state.company.address.street = data.logradouro;
        state.company.address.district = data.bairro;
        state.company.address.city = data.localidade;
        state.company.address.state = data.uf;
      } catch (err) {
        console.log(err);
      }
    },
    changeCategory(state, isCPF) {
      if (isCPF) {
        state.placeholder = '___.___.___-__';
        state.label = 'CPF';
        state.maskProperty = '###.###.###-##';
      } else {
        state.placeholder = '__.___.___/____-__';
        state.label = 'CNPJ';
        state.maskProperty = '##.###.###/####-##';
      }
    },
    choosenPeriod(state, n) {
      switch (n) {
        case 1:
          state.pricesPerPeriod = state.prices.mensal;
          break;
        case 2:
          state.pricesPerPeriod = state.prices.trimestral;
          break;
        case 3:
          state.pricesPerPeriod = state.prices.semestral;
          break;
        case 4:
          state.pricesPerPeriod = state.prices.anual;
          break;
        default:
          break;
      }
    },
    changePlan() {
      router.push('/changePlan');
    },
    SET_CPF_OR_CNPJ: (state, newValue) => {
      state.company.info.cpfOrCnpj = newValue;
    },
    SET_FANTASY_NAME: (state, newValue) => {
      state.company.info.fantasyName = newValue;
    },
    SET_COMPANY_NAME: (state, newValue) => {
      state.company.info.companyName = newValue;
    },
    SET_PHONE: (state, newValue) => {
      state.company.info.phone = newValue;
    },
    SET_CELL_PHONE: (state, newValue) => {
      state.company.info.cellPhone = newValue;
    },
    SET_EMAIL: (state, newValue) => {
      state.company.info.email = newValue;
    },
    SET_LINE_OF_BUSINESS: (state, newValue) => {
      state.company.info.lineOfBusiness = newValue;
    },
    SET_CEP: (state, newValue) => {
      state.company.address.cep = newValue;
    },
    SET_NUMBER: (state, newValue) => {
      state.company.address.number = newValue;
    },
    SET_COMPL: (state, newValue) => {
      state.company.address.compl = newValue;
    },
    SET_ACTIVATE_TAB_PERIOD: (state, newValue) => {
      state.activeTabPeriod = newValue;
    },
  },
  actions: {
    setCpfOrCnpj: ({ commit, state }, newValue) => {
      commit('SET_CPF_OR_CNPJ', newValue);
      return state.company.info.cpfOrCnpj;
    },
    setFantasyName: ({ commit, state }, newValue) => {
      commit('SET_FANTASY_NAME', newValue);
      return state.company.info.fantasyName;
    },
    setCompanyName: ({ commit, state }, newValue) => {
      commit('SET_COMPANY_NAME', newValue);
      return state.company.info.companyName;
    },
    setPhone: ({ commit, state }, newValue) => {
      commit('SET_PHONE', newValue);
      return state.company.info.phone;
    },
    setCellPhone: ({ commit, state }, newValue) => {
      commit('SET_CELL_PHONE', newValue);
      return state.company.info.cellPhone;
    },
    setEmail: ({ commit, state }, newValue) => {
      commit('SET_EMAIL', newValue);
      return state.company.info.email;
    },
    setLineOfBusiness: ({ commit, state }, newValue) => {
      commit('SET_LINE_OF_BUSINESS', newValue);
      return state.company.info.lineOfBusiness;
    },
    setCep: ({ commit, state }, newValue) => {
      commit('SET_CEP', newValue);
      return state.company.address.cep;
    },
    setNumber: ({ commit, state }, newValue) => {
      commit('SET_NUMBER', newValue);
      return state.company.address.number;
    },
    setCompl: ({ commit, state }, newValue) => {
      commit('SET_COMPL', newValue);
      return state.company.address.compl;
    },
    setActiveTabPeriod: ({ commit, state }, newValue) => {
      commit('SET_ACTIVATE_TAB_PERIOD', newValue);
      return state.activeTabPeriod;
    },
  },
  getters: {
    index: (state) => state.index,
    buttonShowPrev: (state) => state.buttonShowPrev,
    buttonShowNext: (state) => state.buttonShowNext,
    releaseButton2: (state) => state.releaseButton2,
    releaseButton3: (state) => state.releaseButton3,
    releaseButton4: (state) => state.releaseButton4,
    releaseButton5: (state) => state.releaseButton5,
    enterClass: (state) => state.enterClass,
    leaveClass: (state) => state.leaveClass,
    system: (state) => state.system,
    placeholder: (state) => state.placeholder,
    label: (state) => state.label,
    maskProperty: (state) => state.maskProperty,
    progressBar: (state) => state.progressBar,
    pricesPerPeriod: (state) => state.pricesPerPeriod,
    activeTabPeriod: (state) => state.activeTabPeriod,
    personalName: (state) => state.personalName,
    personalEmail: (state) => state.personalEmail,
    cpfOrCnpj: (state) => state.company.info.cpfOrCnpj,
    fantasyName: (state) => state.company.info.fantasyName,
    companyName: (state) => state.company.info.companyName,
    phone: (state) => state.company.info.phone,
    cellPhone: (state) => state.company.info.cellPhone,
    email: (state) => state.company.info.email,
    lineOfBusiness: (state) => state.company.info.lineOfBusiness,
    cep: (state) => state.company.address.cep,
    street: (state) => state.company.address.street,
    number: (state) => state.company.address.number,
    compl: (state) => state.company.address.compl,
    district: (state) => state.company.address.district,
    city: (state) => state.company.address.city,
    state: (state) => state.company.address.state,
    plan: (state) => state.company.paymentPlan.plan,
    price: (state) => state.company.paymentPlan.price,
    period: (state) => state.company.paymentPlan.period,
    formOfPayment: (state) => state.company.paymentPlan.formOfPayment,
    cardholder: (state) => state.company.paymentPlan.cardholder,
    cardNumber: (state) => state.company.paymentPlan.cardNumber,
    cardExpiringDate: (state) => state.company.paymentPlan.cardExpiringDate,
    cvv: (state) => state.company.paymentPlan.cvv,
  },
  plugins: [createPersistedState()],
});
