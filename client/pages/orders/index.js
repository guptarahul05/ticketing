const OrderIndex = ({ orders }) => {
  return (
    <div>
      <ul>
        {orders.map((o) => {
          return (
            <li key={orders.id}>
              {orders.ticket.title} - {orders.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

OrderIndex.getIntialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  console.log(data);
  return { orders: data };
};

export default OrderIndex;
