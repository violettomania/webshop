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
    <tr>
      <td>{name}</td>
      <td>{address}</td>
      <td>{numItemsInCart}</td>
      <td>{orderTotal}</td>
      <td className='hidden sm:block'>{date}</td>
    </tr>
  );
}
