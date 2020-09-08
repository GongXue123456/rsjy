// initial state
const state = {
    trainPage: {
        pager_offset:'0',
        train_title:'',
        train_year:'',
        owner_type:"1",
        train_state:'',
        train_quarter:''
     }
   }
   
   // getters
   const getters = {};

     // mutations
     const mutations = {
        SET_NEW_PAGE(state, newValue) {
            // state.trainPage=newValue
           state.trainPage.pager_offset = newValue.pager_offset;
           state.trainPage.train_title = newValue.train_title;
           state.trainPage.train_year = newValue.train_year;
           state.trainPage.owner_type = newValue.owner_type;
           state.trainPage.train_state = newValue.train_state;
           state.trainPage.train_quarter = newValue.train_quarter;
         }
       }
   // actions
   const actions = {
     setNewPage ({ commit }, newValue) {
       commit('SET_NEW_PAGE', newValue)
     }
   }
   

   
   export default {
     namespaced: true,
     state,
     getters,
     actions,
     mutations
   }
   