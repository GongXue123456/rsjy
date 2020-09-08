// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}

export default actions
