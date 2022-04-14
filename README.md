# redux-study

상태관리 라이브러리 중 하나인 redux를 학습합니다. 주로 react-redux의 형태로 학습할 예정이지만, redux는 react에 종속적인 라이브러리는 아니기 때문에 react-study와 따로 분리하였습니다.



### Redux란 무엇인가?

>  A Predictable State Container for JS Apps - redux.js.org

공식 홈페이지의 설명에 따르면 JS로 구성된 어플리케이션의 예측가능한 State Container라고 합니다. 즉 중요한 키워드는 Predictable / State Container가 있겠습니다.  이에 대해 하나씩 살펴보는 것을 통해 Redux의 개념에 대해 이해할 수 있을 것 같습니다.



### State

상태라는 뜻으로 프론트엔드 라이브러리/프레임워크에서 자주 언급됩니다. 간단하게 정리하면 프론트엔드 파트의 UI/UX를 구현하며 사용되는 데이터라고 할 수 있습니다.   

**State의 구분**

+ Local State : 컴포넌트 기반의 프레임워크에서 하나의 컴포넌트에 종속된 State를 의미합니다. React의 경우 컴포넌트 내에서 선언하는 useState, Vue의 경우 data에 선언하는 값이 됩니다.
+ Cross-Component State : 단일 컴포넌트를 벗어나 2개 이상의 컴포넌트에 영향을 미치는 State입니다. 대표적으로 Modal을 만드는 경우를 생각할 수 있습니다. 여러 다른 컴포넌트에서 일시적으로 나왔다 사라지는 Modal같은 경우 단일 컴포넌트 내에서 관리하는 State로는 로직을 구현할 수 없습니다. React, Vue 등에 공통적으로 존재하는 props 역시 props chain을 통해 데이터를 위, 아래로 전달함으로써 Cross-Component State를 구현하는 방식입니다.
+ App-Wide State : 어플리케이션 전체에 영향을 미치는 State입니다. 유저 인증 정보 등 App을 시행하며 모든 파트에서 공통적으로 사용하는 데이터의 경우 App전체적으로 관리할 필요가 있습니다. props-chain 또는 React의 경우 React Context등으로 구현할 수 있습니다.



Redux 는 이러한 State를 저장하고 관리하는 container 입니다. 위 State중 Cross-Component State, App-Wide State를 보다 편리한 방식으로 구현하기 위해 사용됩니다. 앱의 규모가 커질수록 props-chain이나 Context를 사용하는 방식은 가독성이 좋지 않거나(provider, cosumer 남발, 모든 컴포넌트마다 props 처리 등)특정 컴포넌트에서 State나 Logic이 누락될 가능성을 높이기 때문에 Redux를 사용하는 것을 통해 이점을 얻을 수 있습니다.



### Predictable

예측가능하다는 뜻을 이해하기 위해서는 Redux의 작동 방식에 대해 우선적으로 알아봐야할 필요가 있습니다.

**Redux의 작동 방식 / Concept**

+ Central Data Store : 단 하나의 데이터(State) 저장소를 가지며 이를 Store라고 합니다. 각각의 컴포넌트는 Store에 저장된 데이터를 사용합니다(Subscription).
+ Reducer Function : 데이터의 변형(Mutation)을 발생시키는 함수가 존재합니다. 절대 State를 직접 Set하지 않고 Reducer Function을 통해 간접적으로 조작합니다.
+ Action : Reducer Function이 진행할 특정 작업을 전달하는 개념입니다. Action은 컴포넌트와 연결되며 컴포넌트에서 Action을 발생시키는 것을 Dispatch라고 합니다.



즉, Redux는 기본적으로 다음의 사이클을 통해 작동합니다.

1. 컴포넌트에서 Action을 Dispatch
2. Reducer Function에 Action 전달
3. Reducer Function은 전달받은 Action에 따라 State를 변형(Mutation)
4. 변형된 State를 Subscript하는 컴포넌트의 UI가 변경

![ABC of Redux - DEV Community](https://res.cloudinary.com/practicaldev/image/fetch/s--fCDvEpjd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.stack.imgur.com/LNQwH.png)

전체 State변경 과정은 일련의 방향성을 가지며 다른 행동을 촉발하는 경우는 존재하지 않습니다. 또한 Reducer의 경우 순수 함수(특정 input에 대해 항상 같은 output을 보장)로 만들어져야 하며 side effect가 없어야 합니다. 이러한 특성에서 예측가능성 이라는 이점을 얻을 수 있습니다.

Redux를 통해 상태관리를 할 경우 State변경 하나가 일어날 때마다 발생하는 모든 action, mutation을 추적할 수 있고 미리 정의해둔 작업 내용에 따라 결과를 보장할 수 있기 때문입니다.