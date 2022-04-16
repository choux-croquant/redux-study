import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  // (주석처리된 부분) useEffect내에서 비동기 요청을 처리하는 예시
  // 디펜던시인 cart의 변경이 일어날 때 side-effect를 처리한다.
  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    // thunk를 사용하여 비동기 요청을 처리하는 예시
    // 비동기 처리 및 에러처리에 대한 로직을 action 생성자 내부로 이동시켜 분리할 수 있다.
    // UI와 로직을 분리하여 컴포넌트를 보다 깔끔하게 유지할 수 있다.
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }

    // const sendCartData = async () => {
    //   dispatch(uiActions.showNotification(
    //     {
    //       status: 'pending',
    //       title: 'Sending...',
    //       message: 'Sending cart data!',
    //     }
    //   ))

    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts/1',
    //     {
    //       method: 'PUT',
    //       body: JSON.stringify(cart),
    //     }
    //   )

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed')
    //   }

    //   dispatch(uiActions.showNotification(
    //     {
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     }
    //   ))

    // }
    // // 최초에 빈 카트 정보로 요청 보내는 것을 방지
    // if (isInitial) {
    //   isInitial = false
    //   return
    // }

    // sendCartData().catch(err => {
    //   dispatch(uiActions.showNotification(
    //     {
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sent cart data failed!',
    //     }
    //   ))
    // })
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
