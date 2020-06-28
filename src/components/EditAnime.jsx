import React, { Component } from 'react'
import animes from 'consumers/animes'

import AddAnime from 'components/addAnime'

export default class EditAnime extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: ''
    }
  }

  getAnimeByID = async (id) => {        
    try {
      const response = await animes.animeByID(id)
      
      this.setState({ 
        name: response._NM_ANIME,
        description: response._DESC_ANIME
       })
    } catch(err) {
      if (!err) {
        console.log('erro ao se comunicar com o servidor')
      }
    }
  }

  componentDidMount = async () => {
    const { animeID } = this.props.match.params    

    if (animeID) {      
      await this.getAnimeByID(animeID)
    }
  }

  render(){
    const { animeID } = this.props.match.params    

    if(this.state.name === '' && this.state.description === '') return <div>Carregando</div>

    return (
      <AddAnime 
        animeID={animeID}
        name={this.state.name}
        description={this.state.description}
      />
    )        
  }
}