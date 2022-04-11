import classes from './Counter.module.css';
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter-slice";

const CounterToolkit = () => {

  const dispatch = useDispatch();
  const showCounter = useSelector(state => state.counter.showCounter);
  const counter = useSelector(state => state.counter.counter);


  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increasetHandler = () => {
    dispatch(counterActions.increase(10));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toogle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increasetHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default CounterToolkit;
