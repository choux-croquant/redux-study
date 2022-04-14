// store에서 특정 state만 받기 위한 hook, connect의 경우 class형 컴포넌트에 wrapper형태로 사용하여 동일한 작용을 함
import { useSelector, connect, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
// createSlice로 생성한 리듀서 함수에 전달할 액션 객체 import
import { counterActions } from '../store';

const Counter = () => {
  const dispatch = useDispatch();
  // useState와 유사하게 사용
  const counter = useSelector(state => state.counter.counter)
  const showCounter = useSelector(state => state.counter.showCounter)

  // 핸들러 함수와 store의 action연결, store에 미리 정의해둔 type을 인자로 전달한다. 추가적으로 payload를 전달할 수 있다.
  // payload에 리듀서함수에서 활용할 값을 전달하는 것을 통해 기능의 확장이 가능
  // const incrementHandler = (amount) => {
  //   console.log(amount)
  //   dispatch({ type: 'increment', amount: amount })
  // };

  // const decrementHandler = () => {
  //   dispatch({ type: 'decrement' })
  // };

  // const toggleCounterHandler = () => {
  //   dispatch({ type: 'toggleCounter' })
  // };

  // redux-toolkit을 사용한 경우의 dispatch방식
  const incrementHandler = (amount) => {
    // payload는 메서드에 인자로 전달하는 것을 통해 넘길 수 있다. 이 때 payload의 필드명은 'payload'로 고정값이다.
    dispatch(counterActions.increment(amount))
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => incrementHandler(1)}>Increment</button>
        <button onClick={() => incrementHandler(5)}>Increment + 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
