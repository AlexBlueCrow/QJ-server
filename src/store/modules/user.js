import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    farmname: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_FARMNAME: (state, farmname) => {
    state.farmname = farmname
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('suc')
        const { data } = response //data doesnot wokr
        commit('SET_TOKEN', response.token)
        
        setToken(response.token)
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log('store getinfo')  
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log('====', response.data)
        const { data } = response
        
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name } = data.name
        const { farmname } = data.farm
        console.log(farmname, data.farm,name ,data.name)
        commit('SET_NAME', data.name)
        commit('SET_FARMNAME', data.farm)
        resolve(data)
      }).catch(error => {
        console.log('catch error')
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

