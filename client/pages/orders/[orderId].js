import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      console.log(payment);
      Router.push('/order');
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div> Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        amount={order.ticket.price * 100}
        email={currentUser.email}
        stripeKey="pk_test_51HF5xXKiXd9tN72eVfnxDRWG9unNKT5aD34v7ERxGCXflLdUARJtlPCACmtglNeiA9ShQONPZKXKAWLW9dx5Lr1g00HKlZRp5M"
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  console.log('orderId', orderId);
  const { data } = await client.get(`/api/orders/${orderId}`);
  console.log('data', data);
  return { order: data };
};
export default OrderShow;
