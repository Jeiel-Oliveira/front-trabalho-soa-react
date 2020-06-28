import React, { Component } from 'react'

import AddPersonagem from 'components/addPersonagem'
import personagem from 'consumers/personagens'

export default class EditPersonagem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      values: {}
    }
  }

  getCharByID = async (id) => {        
    try {
      const response = await personagem.personagemByID(id)      
      
      const data = {
        charID: response._ID_PERSONAGEM, 
        name: response._NM_PERSONAGEM ,
        idade: response._IDADE_PERSONAGEM,
        altura: response._ALTURA_PERSONAGEM.toFixed(2),
        animeID: response._ID_ANIME
      }
      
      this.setState({ values: data })
    } catch(err) {
      if (!err) {
        console.log('erro ao se comunicar com o servidor')
      }
    }
  }

  componentDidMount = async () => {
    const { charID } = this.props.match.params              

    if (charID) {      
      await this.getCharByID(charID)
    }
  }

  render() {
    const { charID } = this.props.match.params        
    const { values } = this.state

    if(Object.keys(values).length < 1) return <div>Carregando</div>

    return (      
      <AddPersonagem 
        charID={charID}
        values={this.state.values}
      />
    ) 
  }
}