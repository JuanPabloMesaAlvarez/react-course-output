import React, { useRef, useState } from 'react';
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = props => {

    const amountInpuRef = useRef();
    const [isValidAmount, setIsValidAmount] = useState(true);

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInpuRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmount < 0 || enteredAmount > 5) {
            setIsValidAmount(false);
            return;
        }

        setIsValidAmount(true);
        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInpuRef}
            label="Amount" input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} />
        <button>+ Add</button>
        { !isValidAmount && <p>Please insert a valid amount 1-5.</p> }
    </form>
};

export default MealItemForm;