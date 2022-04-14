// 리덕스 Store를 정의하는 파일
import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true }

// redux-toolkit을 활용하여 리듀서 함수를 더욱 간단하게 작성하기
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  // reducers에 작성한 함수의 이름이 곧 액션타입이 된다.
  reducers: {
    increment(state, action) {
      // reducers내부에서는 이런 방식으로 state를 직접 변경하는 것 처럼 작성할 수 있다.
      // 실제로는 immer라이브러리를 사용하여 자동으로 객체를 복사하므로 불변성을 유지한다.
      state.counter = state.counter + action.payload
    },
    decrement(state) {
      state.counter--
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  }
})

// 리듀서 함수를 정의하는 기본적인 방법, default state와 action 타입을 인자로 받는다.
const counterReducer = (state = initialState, action) => {
  // 액션타입에 따라 리턴값이 변경
  if (action.type === 'increment') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter

    }
  }

  if (action.type === 'toggleCounter') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter
    }
  }
  // if문에 해당하는 액션이 아닌 경우 그대로 반환
  return state;
}

// store를 생성하고 할당
// const store = createStore(counterReducer)

// createSlice를 사용한 경우의 스토어 생성, 규모가 커지고 여러개의 slice가 생길 경우 reducer에 할당하는 객체에 slice들을 추가할 수 있다.
// 전달한 reducer map을 configureStore가 하나로 병합하기 때문에 단일 스토어 규칙에 위배되지 않는다.
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
})

// createSlice 형태의 리듀서 함수에서 액션 객체를 생성하는 방법, 액션 생성자라고 한다.
// actions에 메서드의 형태로 등록한 리듀서 함수들이 연결되며 액션타입의 이름은 메서드의 이름이다.
export const counterActions = counterSlice.actions;

// 생성한 store를 다른 컴포넌트에서 사용할 수 있도록 export
export default store