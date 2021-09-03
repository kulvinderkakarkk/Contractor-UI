
import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { SERVER_CONFIG } from '../config'
function ListCard({card}) {
    const image_url=SERVER_CONFIG+card.image    
    return (
          <List.Item>
          <Image avatar src={image_url} />
          <List.Content>
            <List.Header as='a'>{card.firstName} {card.lastName}</List.Header>
            <List.Description>
            You can contact me on Email:
              <a>
                <b> {card.email}</b>
              </a>{' '}
              or phone number
              <a>
                <b> {card.phoneNumber}</b>
              </a>{' '}
            </List.Description>
          </List.Content>
        </List.Item>
    )
}

export default ListCard;









