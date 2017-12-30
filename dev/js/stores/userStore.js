import Vuex from 'vuex';

const state = {
    isConnected : false,
    data : {}
};
const mutations = {
    PUT_ONLINE(state){
        state.isConnected = !0;
    },
    PUT_OFFLINE(state){
        state.isConnected = !1;
    },
    PUT_DATA(state,data){
        state.data = data;
    },
    CLEAR_DATA(state){
        state.data = {}
    }
};

const getters = {
    isConnected : state => state.isConnected,
    data : state => state.data
};

const actions = {
    putOnline(store){
        store.commit('PUT_ONLINE');
    },
    putOffline(store){
        store.commit('PUT_OFFLINE');
    },
    putData(store,data){
        store.commit('PUT_DATA',data);
    },
    clearData(store){
        store.commit('CLEAR_DATA');
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

export default store;