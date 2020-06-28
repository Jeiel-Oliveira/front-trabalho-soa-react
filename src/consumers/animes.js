import api from '../api/api'

const animes = {

  listanimes: async () => {
    try {
      const response = await api.get('/ListAnimes')
      return response
    } catch (err) {
      throw err.response
    }
  },

  animeByID: async (id) => {
    try {
      const response = await api.get(`/ListAnimes/${id}`)
      return response.data[0]
    } catch (err) {
      throw err.response
    }
  },
  
  addAnime: async (data) => {
    try {
      const response = await api.post(
        '/Anime/Add',        
        data,
        { headers: {'Content-Type': 'application/json'} },
      )
      return response
    } catch (err) {
      throw err.response
    }
  }
}

export default animes