import React, { Component } from 'react'

import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import personagens from 'consumers/personagens'

export default class personagemList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      personagensData: null
    }
  }

  getPersonagens = async () => {
    const { animeID } = this.props.match.params

    try {
      const response = await personagens.listpersonagem(animeID)
      const personagensData = response.data

      this.setState({ personagensData })
    } catch (err) {
      if (!err.response) {
        console.log('Erro ao se comunicar com o servidor!')
      }
    }
  }

  componentDidMount() {
    this.getPersonagens()
  }

  render() {
    const { personagensData } = this.state
    const { animeID } = this.props.match.params

    if (personagensData == null) return <h1>Nenhum personagem encontrado</h1>

    return (
      <>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Idade</Table.HeaderCell>
              <Table.HeaderCell>Altura</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>              
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {personagensData.map(itens => (
              <Table.Row key={itens._ID_PERSONAGEM}>
                <Table.Cell>{itens._ID_PERSONAGEM}</Table.Cell>
                <Table.Cell>{itens._NM_PERSONAGEM}</Table.Cell>
                <Table.Cell>{itens._IDADE_PERSONAGEM}</Table.Cell>
                <Table.Cell>{itens._ALTURA_PERSONAGEM.toFixed(2)}</Table.Cell>                
                <Table.Cell><Link to={`/editPersonagem/${itens._ID_PERSONAGEM}`}>Editar</Link></Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table>

        <div className="center-div">
          <Link className="link-button" to={`/addPersonagem/${animeID}`}>Adicionar personagem</Link>
        </div>
      </>
    )
  }
}