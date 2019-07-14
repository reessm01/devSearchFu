import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: 0
  },
  mutations: {
    SET_TIP(state, payload) {
      state.index = payload.index;
    }
  },
  actions: {
    changeTip({ commit }, data) {
      commit("SET_TIP", { index: data });
    }
  }
});
