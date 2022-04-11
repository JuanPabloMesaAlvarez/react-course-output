import { useState } from "react";
import './App.css';

import AddUser from './components/AddUser/AddUser';
import UserList from "./components/UserList/UserList";
import Popup from "./components/Popup/Popup";

function App() {

  const [users, setUsers] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorPopupMsg, seterrorPopupMsg] = useState('');

  const onAddUserHandler = (user) => {
    if (!validateInput(user)) {
      setShowErrorPopup(true);
      return;
    }

    setShowErrorPopup(false);
    user.key = Math.random();
    setUsers(prevUsers => [user, ...prevUsers]);
  };

  const validateInput = (user) => {

    if (user.age < 1) {
      setShowErrorPopup(true);
      seterrorPopupMsg('Age must be greather than 0');
      return false;
    }

    return true;
  };

  const onCloseHandler = () => {
    setShowErrorPopup(false);
  };

  let popup = null;

  if (showErrorPopup)
    popup = (<Popup message={errorPopupMsg} onClose={onCloseHandler} />)

  return (
    <div className="App">
      <AddUser onAddUser={onAddUserHandler} />
      <UserList users={users} />
      {popup}
    </div>
  );
}

export default App;
