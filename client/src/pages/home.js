import React,{useState, useEffect} from 'react'
import { Dropdown, List, Grid} from 'semantic-ui-react'
import { useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ListCard from '../components/ListCard'
import TileCard from '../components/TileCard'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import PostCard from '../components/PostCard'
function Home(props) {
    const [activeOption,setActiveOption] =useState(localStorage.getItem("view"))
    var cards=null;
    const {loading, data} = useQuery(FETCH_ALL_CONTRACTORS)
    if(data) {
       cards = data.getContractors
    }
    function showByOption(e,{value}) {
            console.log(e.target.textContent)
            //localStorage.setItem("view", "List")
            setActiveOption(e.target.textContent)
    }
    useEffect(()=>{
        if(activeOption==="List") {
          localStorage.setItem("view", "List")
        } else {
          localStorage.setItem("view", "Tile")
        }
    },[activeOption])
    const tagOptions = [
      {
        key: 'List',
        text: 'List',
        value: 'List',
        label: { color: 'red', empty: true, circular: true },
      },
      {
        key: 'Tile',
        text: 'Tile',
        value: 'Tile',
        label: { color: 'blue', empty: true, circular: true },
      },
    ]
      
    return (
      <>
    <PostCard props={props}/>
    <Dropdown
    text='Filter Options'
    icon='filter'
    floating
    labeled
    button
    className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Divider />
      <Dropdown.Header icon='tags' content='View by' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} onClick={showByOption} />
        ))}
      </Dropdown.Menu>
    </Dropdown.Menu>
  </Dropdown>
    {activeOption === "List"?(
      <List divided relaxed>
        {loading ?<ReactSpinner />:(cards && cards.map(card=>(
          <ListCard key={card.id} style={{marginTop:10}} card={card}/ >
        )))}
      
      </List>
    ):(
      <Grid columns={3}>
    <Grid.Row>
    {loading ? (<ReactSpinner />):(cards && cards.map(card => (
        <Grid.Column key= {card.id} style={{marginBottom: 20}}>
            <TileCard  card = {card} />
        </Grid.Column>
    )))}
    </Grid.Row>
  </Grid>
    )}
    </>
    )
}

const FETCH_ALL_CONTRACTORS=gql`
query {
  getContractors {
    email
    id
    firstName
    lastName
    phoneNumber
    image
  }
}
`

export default Home