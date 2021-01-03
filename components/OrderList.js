import styles from '../styles/OrderList.module.css'

export default function OrderList({ orders }) {
  return (
    <> 
      <table className={styles.table}>
        <thead>
          <th>Date</th>
          <th>ID</th>
          <th>Title</th>
          <th>Total</th>
          <th>Status</th>
        </thead>

        {orders.map(order => (
          <tbody key={order.id}>
            <td>{new Date(order.created_at).toLocaleDateString('en-US')}</td>
            <td>{order.id}</td>
            <td>{order.product.title}</td>
            <td>${order.total}</td>
            <td className={styles[order.status]}>{order.status}</td>
          </tbody>
        ))}
      </table>
    </>
  )
}
