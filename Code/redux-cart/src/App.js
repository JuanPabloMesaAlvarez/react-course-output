import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import useHttp from "./hooks/use-http";
import { sendCartAction, fetchCart } from "./store/cart-actions";

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const { executeHttpRequest } = useHttp('http://localhost:5000');
  const showCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const callBack = useCallback((requestConfig, responseHandler, errorHandler) => executeHttpRequest(requestConfig, responseHandler, errorHandler), []);

  useEffect(() => {
    dispatch(fetchCart(callBack));
  }, [dispatch, callBack]);

  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (!cart.changed) {
      return;
    }

    dispatch(sendCartAction(callBack, cart));
    // dispatch(uiActions.showNotification({
    //   status: 'pending',
    //   title: 'Sending...',
    //   message: 'Getting cart..'
    // }));
    // executeHttpRequest({
    //   resource: 'cart',
    //   method: 'POST',
    //   body: JSON.stringify(cart),
    // }, (cartId) => {
    //   dispatch(uiActions.showNotification({
    //     status: 'success',
    //     title: 'Success!',
    //     message: 'Cart succesfully fetched!'
    //   }));
    // },
    // (error) => {
    //   dispatch(uiActions.showNotification({
    //     status: 'error',
    //     title: 'Something went wrong!',
    //     message: error
    //   }));
    // });

  }, [cart, dispatch, callBack]);

  return (
    <Fragment>
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
