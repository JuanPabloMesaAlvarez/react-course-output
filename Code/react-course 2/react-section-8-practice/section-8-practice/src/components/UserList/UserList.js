import React from "react";

import Card from "../UI/Card/Card";

import './UserList.css';

const UserList = (props) => {

    const UsersList = props.users.map(user => (
        <div key={user.key} className="table-row">
            <div className="table-column">{user.name}</div>
            <div className="table-column">{user.age}</div>
        </div>
    ));

    return (
        <Card>
            { UsersList}
        </Card>
    );
};

export default UserList;