import React, { Component } from 'react'

import { Form, Button, Input } from 'semantic-ui-react'
import personagens from 'consumers/personagens'

import SweetAlert from 'sweetalert2';

export default class AddPersonagem extends Component {

  constructor(props) {
    super(props)

    this.state = {         
      nome: '',
      idade: '',
      altura: ''
    }    
  }

  addPersonagem = async () => {
    const { nome, idade, altura } = this.state    
    const { values, charID } = this.props        

    let resposta = 'adicionado'

    const data = {             
      nome,
      idade,
      altura
    }         

    if(this.props.match) {
      if(this.props.match.params.animeID) data.animeID = this.props.match.params.animeID    
    } 
    if(charID) {
      data.personagemID = charID
      data.animeID = values.animeID
      resposta = 'editado'
    }

    if(nome === '' || idade === '' || altura === '') {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Adicione o nome, idade e altura'
      })         
    }

    try {
      await personagens.addPersonagem(data)  
            
      SweetAlert.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: `Personagem ${resposta} com sucesso!`
      })
    } catch (err) {
      if (!err) {
        console.log('erro ao se comunicar com o servidor')
      }
    }
  }

  componentDidMount() {
    const { charID, values } = this.props      

    if(charID) {
      this.setState({ nome: values.name, idade: values.idade, altura: values.altura })
    }
  }

  render() {
    const { charID } = this.props      

    return (
      <Form>
        <Form.Field>
          <label>Nome</label>
          <Input 
            icon='user secret' 
            iconPosition='left' 
            placeholder='digite o nome'    
            value={this.state.nome}        
            onChange={(e) => this.setState({ nome: e.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Idade</label>
          <Input 
            icon='file alternate' 
            iconPosition='left' 
            placeholder='Descrição'
            value={this.state.idade}        
            onChange={(e) => this.setState({ idade: e.target.value })} />
        </Form.Field>        
        <Form.Field>
          <label>Altura</label>
          <Input 
            icon='file alternate' 
            iconPosition='left' 
            placeholder='Descrição'
            value={this.state.altura}        
            onChange={(e) => this.setState({ altura: e.target.value })} />
        </Form.Field>        
        <Button onClick={this.addPersonagem}>{charID ? 'Editar' : 'Adicionar'}</Button>
      </Form>  
    )
  }
}