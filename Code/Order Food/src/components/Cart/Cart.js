import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = props => {

    const { isLoading, error, httpRequest } = useHttp('http://localhost:5000');
    const cartCtx = useContext(CartContext);
    const [isCheckout, setCheckout] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const hasItems = cartCtx.items.length > 0;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setCheckout(true);
    }

    const submitOrderHandler = (orderData) => {
        const order = {
            ...orderData,
            orderItems: cartCtx.items.map(item => {
                return {
                    id: item.id,
                    price: item.price,
                    amount: item.amount
                }
            })
        }
        httpRequest({
            resource: 'checkout',
            method: 'POST',
            body: order,
            headers: { 'Content-Type': 'application/json' }
        }, (data) => {
            setConfirmationCode(data);
        })
    }

    const cartItems = cartCtx.items.map(item => <CartItem key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        className={classes['cart-items']}
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)} />);

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
        {confirmationCode !== '' ? <p>This is your confirmation code: <b>{confirmationCode}</b></p> : ''}
    </Modal>
};

export default Cart;