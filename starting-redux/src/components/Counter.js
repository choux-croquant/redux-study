// store에서 특정 state만 받기 위한 hook, connect의 경우 class형 컴포넌트에 wrapper형태로 사용하여 동일한 작용을 함
import { useSelector, connect } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  // useState와 같이 사용
  const counter = useSelector(state => state.counter)

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
