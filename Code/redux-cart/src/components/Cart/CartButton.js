import { useDispatch, useSelector } from "react-redux";
import classes from './CartButton.module.css';

import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const itemsInCart = cartItems.reduce((currentNumber, item) => {
    return currentNumber + item.quantity;
  }, 0)

  const clickHandler = () => {
    dispatch(uiActions.toogle());
  };

  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsInCart}</span>
    </button>
  );
};

export default CartButton;
