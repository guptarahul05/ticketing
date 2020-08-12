import Router from 'next/router';
import useRequest from '../../hooks/use-request';
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => {
      Router.push('/orders/[orderId]', `/orders/${order.id}`);
      console.log(order);
    },
  });
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>{ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  console.log('ticketId', ticketId);
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  console.log('data', data);
  return { ticket: data };
};
export default TicketShow;
