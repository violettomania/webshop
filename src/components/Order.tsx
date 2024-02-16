interface OrderProps {
  name: string;
  address: string;
  numItemsInCart: number;
  orderTotal: string;
  createdAt: string;
}

export default function SingleOrder({
  name,
  address,
  numItemsInCart,
  orderTotal,
  createdAt,
}: OrderProps) {
  const date = new Date(createdAt);
  const formattedDate = `${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })} - ${date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;

  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>total orders : 2907</h4>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className='hidden sm:block'>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{address}</td>
              <td>{numItemsInCart}</td>
              <td>{orderTotal}</td>
              <td className='hidden sm:block'>{formattedDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
