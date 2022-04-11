import React from 'react';
import useCounter from '../hooks/use-counter';

const CountBackward = () => {

    const counter = useCounter(false);

    return <div>{counter}</div>
};

export default CountBackward;