import React, { useState } from "react";
import AddUserForm from "../AddUserForm/AddUserForm";

import './AddUser.css';

const AddUser = (props) => {

    const [enteredName, setEnteredName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const onNameChangedHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const onAgeChangedHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAddUser({ name: enteredName, age: enteredAge });
    };

    return (
        <AddUserForm
            onNameChanged={onNameChangedHandler}
            onAgeChanged={onAgeChangedHandler}
            onSubmitForm={onSubmitHandler} />
    );
}

export default AddUser;