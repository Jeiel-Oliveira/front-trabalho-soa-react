import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import AnimeList from '../components/animeList'
import PersonagemList from '../components/personagemList'
import AddAnime from 'components/addAnime'
import EditAnime from 'components/EditAnime'
import AddPersonagem from 'components/addPersonagem'
import EditPersonagem from 'components/EditPersonagem'

import {Menu} from 'semantic-ui-react'

export default function BaseRoute() {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Router>
      <div className="padding-nav">
        <Menu>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          ><Link to="/">Home</Link></Menu.Item>                 
        </Menu>

        <Switch>
          <Route 
            path="/anime/:animeID"
            component={PersonagemList} 
          />                    

          <Route 
            path="/addAnime/:animeID"
            component={EditAnime} 
          />    

          <Route 
            path="/addAnime"
            component={AddAnime} 
          />             

          <Route 
            path="/editPersonagem/:charID"
            component={EditPersonagem} 
          />

          <Route 
            path="/addPersonagem/:animeID"
            component={AddPersonagem} 
          />                    

          <Route path="/">
            <AnimeList />            
          </Route>          
        </Switch>
      </div>
    </Router>
  )
}