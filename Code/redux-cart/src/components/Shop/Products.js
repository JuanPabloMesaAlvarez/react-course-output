import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from './ProductItem';
import classes from './Products.module.css';

import { productsActions } from "../../store/products-slice";
import { uiActions } from "../../store/ui-slice";
import useHttp from "../../hooks/use-http";

const Products = (props) => {

  const { isLoading, error, executeHttpRequest } = useHttp('http://localhost:5000');
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {

    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Getting products..'
    }));

    executeHttpRequest({
      resource: 'products',
      method: 'GET'
    }, (products) => {
      dispatch(productsActions.loadProducts(products));
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Products succesfully fetched!'
      }));
    }, (error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Something went wrong!',
        message: error
      }));
    })

  }, []);

  let productItems = <h2><u>Not products found</u></h2>

  if (products.length > 0) {
    productItems = products.map(item =>
      <ProductItem
        key={item.title}
        title={item.title}
        price={item.price}
        description={item.description}
      />
    );
  }

  let content = <Fragment>
    <h2>Buy your favorite products</h2>
    <ul>
      {productItems}
    </ul>
  </Fragment>

  if (isLoading) {
    // dispatch(uiActions.showNotification({
    //   status: 'pending',
    //   title: 'Sending...',
    //   message: 'Getting products..'
    // }));
  }

  if (error) {
    // dispatch(uiActions.showNotification({
    //   status: 'error',
    //   title: 'Something went wrong!',
    //   message: error
    // }));
  }


  return (
    <section className={classes.products}>
      {content}
    </section>
  );
};

export default Products;
