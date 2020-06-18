import Vue from 'vue';
import * as constants from '@/store/constants';
import ControllerContract from '@/contracts/Controller.json';
import store from '@/store';
import { ControllerAddress, web3 } from '@/handlers';

if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => {
    store.dispatch(constants.SESSION_CONNECT_WEB3);
  });
}

const state = {
  account: null,
  instance: null,
  isOwner: false,
};

const actions = {
  [constants.SESSION_CONNECT_WEB3]: ({ commit }) => {
    web3.eth.getAccounts()
      .then(([account]) => {
        commit(constants.SESSION_SET_PROPERTY, { account });
        return account;
      })
      .then(() => Vue.rbank.controller.eventualIsOwner())
      .then((isOwner) => {
        commit(constants.SESSION_SET_PROPERTY, { isOwner });
      })
      .catch((e) => {
        console.error(e);
        commit(constants.SESSION_SET_PROPERTY, { isOwner: false });
      });
  },
  [constants.SESSION_INIT_CONTROLLER]: ({ commit }) => {
    const instance = new web3.eth.Contract(ControllerContract.abi, ControllerAddress);
    commit(constants.SESSION_SET_PROPERTY, { instance });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_SET_PROPERTY]: (state, data) => {
    const [[property, value]] = Object.entries(data);
    state[property] = value;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_IS_LOGGED]: (state) => !!state.account,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
