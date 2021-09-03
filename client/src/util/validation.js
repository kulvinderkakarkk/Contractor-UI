import {useState} from "react";

export const Validation=(callback, initialState={})=> {

    const [values,setValues]= useState(initialState)

    const onSubmit=(event)=> {
        event.preventDefault();
        callback();
    }

    const onChange= (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }

    return {values, onSubmit, onChange};
    

}