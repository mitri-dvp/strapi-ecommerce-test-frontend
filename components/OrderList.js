import {useEffect, useState} from 'react'

import styles from '../styles/OrderList.module.css'
import PagesControls from './PagesControls'
import OrderItem from './OrderItem'

export default function OrderList({ orders }) {

  const [limit, setLimit] = useState(4)
  const [pages, setPages] = useState(1)
  const [current, setCurrent] = useState(1)
  const [items, setItems] = useState([])

  const changePage = (n) => {
    if(n < 1) return
    if(n > pages) return
    setCurrent(n)
  }

  useEffect(() => {
    const a = orders.length % limit ? Math.floor(orders.length / limit) + 1 : orders.length / limit
    setPages(a)

    let temp = []
    for (let i = (current-1) * limit; i < ((current-1) * limit)+limit; i++) {
      const order = orders[i]
      if(!order) break
      temp.push(<OrderItem key={order.id} order={order}/>) 
    }
    setItems(temp)
  }, [orders, current, limit])

  return (
    <div className={styles.wrapper}> 
      <div className={styles.pagination}>
        {orders.length ? 
          <>
            <div>
              <p>{orders.length} Results <span>Page: {current} / {pages}</span></p>
            </div>
            <div>
              <PagesControls props={{current, pages, changePage}}/>
            </div>
          </>
        :
          <>
            0 Results
          </>
        }
      </div>
      <div className={styles.table_wrapper}>
      {items}
      </div>
    </div>
  )
}
