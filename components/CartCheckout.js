import { useContext } from 'react'

import styles from '../styles/CartCheckout.module.css'
import CartContext from '../context/CartContext'
import CartCheckoutItem from './CartCheckoutItem'

export default function CartCheckout() {
  const { products, total } = useContext(CartContext)
  return (
    <>
    <table className={styles.cart_checkout}>
      <thead>
        <tr>
          <th>Product</th>
          <th>&nbsp;</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (<CartCheckoutItem product={product} key={product.id}/> ))}
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td><h4>TOTAL:</h4></td>
          <td><h4>{total.toFixed(2)}</h4></td>
        </tr>
      </tbody>
    </table>
    </>

  )
}
