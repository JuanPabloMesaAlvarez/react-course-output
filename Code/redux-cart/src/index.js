import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import Notification from "./components/UI/Notification";
import store from "./store/index";

ReactDOM.render(
    <Provider store={store}>
        <Notification />
        <App />
    </Provider>,
    document.getElementById('root'));
