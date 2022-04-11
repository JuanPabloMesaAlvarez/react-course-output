const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        };    
    }
    
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        };    
    }
    
    return state;
};

const store = redux.createStore(counterReducer);
const store2 = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const state = store.getState();
    console.log(state.counter);
};

const counterSubscriber2 = () => {
    const state = store2.getState();
    console.log('From subsriber 2 -> ' + state.counter);
};

store.subscribe(counterSubscriber);
// store.subscribe(counterSubscriber2);
store2.subscribe(counterSubscriber2);

store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: ''});
store.dispatch({type: 'decrement'});
console.log('--------------------');
store2.dispatch({type: 'decrement'});
store2.dispatch({type: 'decrement'});