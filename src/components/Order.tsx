import formatDate from '../util/dateFormatter';

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
  const date = formatDate(createdAt);

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
              <td className='hidden sm:block'>{date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
