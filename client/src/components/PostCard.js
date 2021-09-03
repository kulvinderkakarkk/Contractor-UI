import React,{useState, useEffect} from 'react'
import {Card, Form, Button, Message } from 'semantic-ui-react'
import {Validation} from '../util/validation'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
function PostCard(props) {
    const {values, onSubmit, onChange} = Validation(add_contractor, {
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        image:null
    })
    const [selectedFile, setSelectedFile] = useState(null);
    let [errors,setErrors]=useState({})
    const [addContractor]= useMutation(INSERT_CONTRACTOR, {
        update(proxy, {data:{addContractor:userData}}) {
            window.location.reload(false)
        }, onError(err) {
        }
        , variables: values
    })

    function add_contractor() {
      const result=check_validation(values)
      if(result === true) {
        addContractor()
      }
      else {
        alert(result)
      }
      
        
    }
    useEffect(() => {
      values.image=selectedFile
    },[selectedFile]);
    return (
        <Card fluid>
      <Card.Content header='Want to Register?' />
      <Card.Content description="Post a new Contractor" />
      <Form style={{"marginLeft":"5%","marginRight":"5%", "marginBottom":"5px"}} onSubmit={onSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            label='First Name'
            name="firstName"
            placeholder='First name'
            onChange={onChange}
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Last Name'
            name="lastName"
            placeholder='Last name'
            onChange={onChange}
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Email'
            name="email"
            placeholder='Email'
            onChange={onChange}
          />
          <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Phone Number'
            name="phoneNumber"
            placeholder='Phoner Number'
            onChange={onChange}
          />
        </Form.Group>
        <input
          type="file"
          onChange={async(e) => {
            setSelectedFile(e.target.files[0])}}
        />
        <Button type='submit'>Submit</Button>
        
      </Form>
      
      {Object.keys(errors).length >0 && (<Message 
       warning
       header='Could you check something!'
       list={[Object.values(errors)[0] ]}
     />)  }
    </Card>
    )
}

function check_validation(values) {
  if(values.firstName.trim()==='') {
    return "First Name cannot be empty"
  } else if(values.lastName.trim()==='') {
    return "Last Name cannot be empty"
  } else if(values.email.trim()==='') {
    return 'Email cannot be empty'
  } else if(values.phoneNumber.trim()=== '') {
    return 'Phone number cannot be empty'
  } else if(values.image===null) {
    return 'Please upload an image'
  } else {
    return true
  }
} 
const INSERT_CONTRACTOR= gql`

mutation  addContractor (
    $firstName:String!
    $lastName: String!
    $email:String!
    $phoneNumber:String!
    $image:Upload!) {
  insertContractor(contractorInput:{
    firstName:$firstName
    lastName:$lastName
    email:$email
    phoneNumber:$phoneNumber 
  }, file:$image) {
    firstName
    lastName
    id
    email
    phoneNumber
  }
}
`

export default PostCard;