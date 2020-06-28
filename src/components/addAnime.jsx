import React, { Component } from 'react'

import { Form, Button, Input } from 'semantic-ui-react'
import animes from 'consumers/animes'

import SweetAlert from 'sweetalert2';

export default class AddAnime extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: ''      
    }
  }  

  addAnime = async () => {
    const { name, description } = this.state
    const { animeID } = this.props 
    let resposta = 'adicionado'      

    const data = {
      nome: name,
      descricao: description
    }    

    if(animeID) {
      data.animeID = animeID
      resposta = 'editado'
    }
    
    if(name === '' || description === '') {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Adicione o nome e o texto'
      })         
    }    

    try {
      await animes.addAnime(data)              
      SweetAlert.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: `Anime ${resposta} com sucesso!`
      })
    } catch (err) {
      if (!err) {
        console.log('erro ao se comunicar com o servidor')
      }
    }
  }  

  componentDidMount() {
    const { animeID } = this.props        

    if(animeID) {
      this.setState({ name: this.props.name, description: this.props.description })
    }
  }

  render() {
    const { animeID } = this.props
    return (
      <Form>
        <Form.Field>
          <label>Nome</label>
          <Input 
            icon='user secret' 
            iconPosition='left' 
            placeholder='digite o nome'       
            value={this.state.name}    
            onChange={(e) => this.setState({ name: e.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Descrição</label>
          <Input 
            icon='file alternate' 
            iconPosition='left' 
            placeholder='Descrição'
            value={this.state.description}    
            onChange={(e) => this.setState({ description: e.target.value })} />
        </Form.Field>        
        <Button onClick={this.addAnime}>{animeID ? 'Editar' : 'Adicionar'}</Button>
      </Form>  
    )
  }
}