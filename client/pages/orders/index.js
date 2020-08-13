const OrderIndex = ({ orders }) => {
  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((o) => {
          return (
            <li key={o.id}>
              {o.ticket.title} - {o.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  console.log(data);
  return { orders: data };
};

export default OrderIndex;
