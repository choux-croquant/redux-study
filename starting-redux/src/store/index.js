// 리덕스 Store를 정의하는 파일
import { createStore } from "redux";

// 리듀서 함수를 정의, default state와 action 타입을 인자로 받는다.
const counterReducer = (state = { counter: 0 }, action) => {
  // 액션타입에 따라 리턴값이 변경
  if (action.type === 'increament') {
    return {
      counter: state.counter + 1,
    }
  }

  if (action.type === 'decreament') {
    return {
      counter: state.counter - 1,
    }
  }
  // if문에 해당하는 액션이 아닌 경우 그대로 반환
  return state;
}

// store를 생성하고 할당
const store = createStore(counterReducer)

// 생성한 store를 다른 컴포넌트에서 사용할 수 있도록 export
export default store