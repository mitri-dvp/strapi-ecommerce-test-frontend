import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const CartContext = createContext()

export const CartProvider = (props) => {

  // const [products, setProducts] = useState(null)
  const [firstLoad, setFirstLoad] = useState(true)
  const [products, setProducts] = useState([])
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const redirectToCheckout = () => {
    setIsOpen(false)
    router.push('/checkout')
  }

  // Check if product is in Cart
  const isInsideCart = (product) => {
    return products.find(e => e.id === product.id);
  }

  const addToProducts = (product) => {
    if(isInsideCart(product)) {
      setIsOpen(true)
      return
    }
    product.cart_amount = 1
    setProducts([...products, product])
    setIsOpen(true)
    return
  };

  const removeFromProducts = (product) => {
    setProducts(products.filter(e => e.id != product.id))
    return
  };

  const addOne = (product) => {
    product.limit = 10
    if(product.cart_amount >= product.limit) return
    product.cart_amount = product.cart_amount + 1
    updateCartValues()
    return
  }

  const subtractOne = (product) => {
    if(product.cart_amount <= 1) return
    product.cart_amount = product.cart_amount - 1
    updateCartValues()
    return
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setProducts([])
    updateCartValues()
  }

  const updateCartValues = () => {
    let cartItemCount = 0;
    let cartTotal = 0;
    products.forEach(item => {
      cartItemCount = +cartItemCount + +item.cart_amount
      cartTotal = +cartTotal + parseFloat((+item.price * +item.cart_amount).toFixed(2))
    })
    setItemCount(cartItemCount)
    setTotal(cartTotal)
  }

  const saveCart = () => {
    updateCartValues()
    localStorage.setItem('cart', JSON.stringify({products, itemCount, total}));
  };

  useEffect(async () => {
    if(firstLoad) {
      // Get Cart
      if (localStorage.getItem('cart')) {
        const {products, itemCount, total} = JSON.parse(localStorage.getItem('cart'))
        setProducts(products)
        setItemCount(+itemCount)
        setTotal(+total)
        setFirstLoad(false)
      } else {
        setProducts([]);
        setFirstLoad(false)
      }
    } else {
      saveCart()
    }
  }, [products, itemCount, total]);

  return (
    <CartContext.Provider value={{isInsideCart, isOpen, setIsOpen, redirectToCheckout, addToProducts, removeFromProducts, addOne, subtractOne, products, itemCount, total, clearCart}}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContext