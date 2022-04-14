# Redux 기초
Udemy의 React 완벽 가이드 with Redux, Next.js, TypeScript 강좌를 학습하며 작성하였습니다.

### src/store/index.js
store를 생성하는 방법, 리듀서 함수를 생성하는 방법, 리듀서 함수에 타입과 payload를 전달하는 방법 작성
redux-toolkit의 createSlice를 사용하여 리듀서 함수 압축하기.

### src/components/Counter.js
컴포넌트에서 store의 state를 참조하는 방법, 컴포넌트에서 action을 발생시키는 방법 작성


### Redux State의 주의사항
리듀서 함수 내부에서 인자로 받은 기존의 state를 직접 변경하는 것은 금기사항
항상 새로운 state객체 또는 배열을 정의하고 이를 반환해야 한다.
객체나 배열은 JS의 참조값이기 때문에 기존 state를 변경하는 것은 의도치 않은 동작을 발생시킬 수 있기 때문이다.
Redux의 state업데이트 로직은 이전의 state와 새로운 state를 비교하여 변경되었을 경우에만 발생한다.
이전 state가 객체/배열의 형태로 주어지면 내부의 값을 직접 조작하여 value를 변경해도 이전 state가 저장된 메모리 주소는 변경되지 않기 때문에 변경 사항이 없는 것으로 처리된다.
새로운 객체/배열을 반환하면서 직접 조작한 값이 반영되어 정상 작동하는 것처럼 보일 수 있지만 예기치 못한 side effect가 발생할 수 있으므로 애초에 주의.

```
// 올바른 방식
...
if (action.type === 'increment') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }

// 잘못된 방식
if (action.type === 'increment') {
    // 이와 같이 state를 직접변경하면 안된다.
    state.counter++

    return {
      counter: state.counter
      showCounter: state.showCounter
    }
  }
...
```

### Redux toolkit
프로젝트가 커지면서 action type이 너무 많아지는 경우 이름이 겹칠 수 있다. 또한 state객체에서 다루는 데이터의 양이 너무 많아질 수도 있다.
그렇게 될 경우 불필요한 state들을 계속해서 복사해야하고, 리듀서 함수의 경우 너무 길어져 가독성이 떨어지게 된다.
Redux toolkit을 통해 이러한 문제들을 어느 정도 해결할 수 있다. 불변성 보존의 기능을 하는 immer, 리렌더링을 방지하는 reselect 등 다른 라이브러리의 기능들 및 다양한 추가 기능을 제공하여 redux를 보다 간편하게 사용할 수 있도록 만들어주는 라이브러리.