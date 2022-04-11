import React from "react";

import Card from "../UI/Card/Card";

import './AddUserForm.css';

const AddUserForm = (props) => {

    return (
        <Card>
            <form onSubmit={props.onSubmitForm}>
                <div className="label">User Name</div>
                <input type="text" onChange={props.onNameChanged} />
                <div className="label">Age</div>
                <input type="number" onChange={props.onAgeChanged} />
                <div>
                    <button type="submit" >Add user</button>
                </div>
            </form>
        </Card>
    );

};

export default AddUserForm;