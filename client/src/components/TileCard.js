import React from 'react'
import { Card } from 'semantic-ui-react'
import { SERVER_CONFIG } from '../config'
function TileCard({card}) {
    const image_url=SERVER_CONFIG+card.image
    return (
        <Card fluid style={{marginTop:10}} >
            <img src={image_url} alt={card.firstName} height={300} className="photo" /> 
            <Card.Content>
            <Card.Header>{card.firstName} {card.lastName}</Card.Header>
            <Card.Meta></Card.Meta>
            <Card.Description>
                You can contact me on {card.email} or {card.phoneNumber}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                My Social Media Links would be added later
            </a>
            </Card.Content>
        </Card>
    )
}

export default TileCard;