import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import animes from 'consumers/animes'

export default class animeList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      animesData: null
    }
  }

  getAnimes = async () => {
    try {
      const response = await animes.listanimes()
      const animesData = response.data

      this.setState({ animesData })
    } catch (err) {
      if (!err) {
        console.log('erro ao se comunicar com o servidor')
      }
    }
  }    

  componentDidMount() {
    this.getAnimes()
  }

  render() {
    const { animesData } = this.state

    if (animesData === null) {
      return <h1>Carregando</h1>
    }

    return (
      <>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Descrição</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {animesData.map(itens => (
              <Table.Row key={itens._ID_ANIME}>
                <Table.Cell>{itens._ID_ANIME}</Table.Cell>
                <Table.Cell>{itens._NM_ANIME}</Table.Cell>
                <Table.Cell>{itens._DESC_ANIME}</Table.Cell>
                <Table.Cell><Link to={`/anime/${itens._ID_ANIME}`}>Ver personagens</Link></Table.Cell>
                <Table.Cell><Link to={`/addAnime/${itens._ID_ANIME}`}>Editar</Link></Table.Cell>                
              </Table.Row>
            ))}

          </Table.Body>
        </Table>
        
        <div className="center-div">
          <Link className="link-button" to="/addAnime">Adicionar anime</Link>
        </div>
      </>
    )
  }
}