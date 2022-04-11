import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {

    const cartCtx = useContext(CartContext);
    const addToCartHandler= (amount) => {
        cartCtx.addItem({...props.item, amount: amount});
    }

    const price = `$${props.item.price.toFixed(2)}`;
    return <li>
        <section className={classes.meal}>
            <div>
                <h3>{props.item.name}</h3>
                <div className={classes.description}>{props.item.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.item.id} onAddToCart={addToCartHandler} />
            </div>
        </section>
    </li>
};

export default MealItem;