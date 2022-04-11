import React from 'react';
import useCounter from '../hooks/use-counter';

const CountForward = () => {
    const counter = useCounter();

    return <div>{counter}</div>
};

export default CountForward;