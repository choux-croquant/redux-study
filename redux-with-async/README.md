# 비동기 처리가 포함된 Redux
Udemy의 React 완벽 가이드 with Redux, Next.js, TypeScript 강좌를 학습하며 작성하였습니다.

### Reducer Function
리듀서 함수는 순수함수이고 / 사이드 이펙트가 없어야 하며 / 동기적이어야 한다.
그렇다면 엄청나게 많이 쓰이는 http요청 등 결과가 보장되지 않은, side-effect가 있는 작업들을 다루려면 어떻게 해야할까?

### Side Effect를 처리하는 두 가지 방법
+ useEffect를 사용하여 컴포넌트 내에서 다루는 기본적인 방식
  + 쉽고 간단하지만, 해당 컴포넌트 내에서만 데이터를 다루며 전역적으로 사용할 수 없다.

+ Action creator내에서 다루는 방식
  + thunk : action을 딜레이시키는 함수, thunk으로 action creator를 작성하는 것으로 action 자체를 반환하는 것이 아닌 action을 반환하는 한 단계 전의 함수를 반환하도록 하며, 이 사이에서 side-effect가 발생하는 작업들을 처리할 수 있다.
  + thunk를 잘 활용하여 UI와 로직을 분리할 수 있다. 적절한 분리는 가독성을 높이고 디버깅을 용이하게 하기 때문에 고려해 보면 좋을 것.
