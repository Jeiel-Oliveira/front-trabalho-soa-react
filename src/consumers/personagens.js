import api from '../api/api'

const personagens = {

  listpersonagem: async (id) => {
    try {
      const response = await api.get(`/ListPersonagens/${id}`)
      return response
    } catch (err) {
      throw err.response
    }
  },

  personagemByID: async (id) => {
    try {
      const response = await api.get(`Personagem/${id}`)
      return response.data[0]
    } catch(err) {
      throw err.response
    }
  },
  
  addPersonagem: async (data) => {
    try {
      const response = await api.post(
        '/Personagem/Add',        
        data        
      )
      return response.data
    } catch (err) {
      throw err.response
    }
  }
}

export default personagens