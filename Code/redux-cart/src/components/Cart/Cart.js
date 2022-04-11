import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {

  const cartItems = useSelector(state => state.cart.items);

  let content = <p>No products found</p>

  if (cartItems.length > 0) {
    content = cartItems.map(item => <CartItem
      key={item.title}
      item={item}
    />)
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {content}
      </ul>
    </Card>
  );
};

export default Cart;
