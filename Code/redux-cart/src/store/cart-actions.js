import { cartActions } from "./cart-slice";
import { uiActions  } from "./ui-slice";

export const sendCartAction = (executeHttpRequest, cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart..'
        }));

        executeHttpRequest({
            resource: 'cart',
            method: 'POST',
            body: JSON.stringify(cart),
        }, (cartId) => {
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart posted succesfully!'
            }));
        }, (error) => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Something went wrong!',
                    message: error
                }));
            });
    };
};

export const fetchCart = (executeHttpRequest) => {

    return (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Getting cart..'
        }));

        executeHttpRequest({
            resource: 'cart',
            method: 'GET',
        }, (cart) => {
            dispatch(cartActions.setCart(cart))
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart succesfully fetched!'
            }));
        }, (error) => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Something went wrong!',
                    message: error
                }));
            });
    }
}

