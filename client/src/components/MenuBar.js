import React,{useState} from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom"

function MenuBar() {
    const path=window.location.pathname
    const pathname=path==="/"?'home':path.substr(1)
    const [activeItem,setActiveItem]=useState(pathname)
    const handleItemClick=(e,{name})=>setActiveItem(name)

    return (
        <div>
          <Menu pointing secondary>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to="/"
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu>
        </div>
      )
}

export default MenuBar