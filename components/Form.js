import {useState, useEffect, useRef} from 'react'
import styles from '../styles/Form.module.css'
import { API_URL } from '../utils/urls'

export default function Form({data}) {
  // Form
  const formDOM = useRef()
  const [sent, setSent] = useState(false)

  // Data
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState('')
  const [message, setMessage] = useState('')

  // Email
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault()
    const form = {name, email, phone, order, message}
    const IGNORE = ['order']
    let error = false;

    Object.keys(form).forEach((key) => {
      document.getElementById(key).classList.remove(styles.error)
      if(form[key] === '') {
        if(IGNORE.includes(key)) return
        document.getElementById(key).classList.add(styles.error);error = true
      }

      switch (key) {
        case 'phone':
          if(!phone.match(/^(\([0-9]{3}\)|[0-9]{3}(-| ))[0-9]{3}(-| )[0-9]{4}$/)) {
            document.getElementById(key).classList.add(styles.error);error = true
          }
          break;
        case 'email':
          if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            document.getElementById(key).classList.add(styles.error);error = true
          }
          break;
        case 'order':
          if(isNaN(order)) {
            document.getElementById(key).classList.add(styles.error);error = true
          }
          break;
      
        default:
          break;
        }
      })

    if(error) return
    if(sent) return
    // setSent(true)
    sendEmail(form)
  }

  const sendEmail = async (form) => {
    setLoading(true)

      console.log('Hitting server with: ', form)
      const res = await fetch(`${API_URL}/orders/contact`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-type': `application/json`,
        }
      })

      const data = await res.json()
      // console.log(data)
      if(data.error) {
        console.log('Error ', data.error)
        setResponse(null)
        return
      }
      console.log('Success ', data)
      setResponse(data)

      setLoading(false)
  }

  useEffect(() => {
    if(data.email) setEmail(data.email)
    const formData = new FormData(formDOM.current)
    setName(formData.get('name'))
    setEmail(formData.get('email'))
    setPhone(formData.get('phone'))
    setOrder(formData.get('order'))
    setMessage(formData.get('message'))


  }, [])

  return (
    <form ref={formDOM} className={styles.form} onSubmit={onSubmit}>

      <div className={styles.form_inputs}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          {data.email ? 
            <input type="text" name="email" id="email" value={email} disabled/>
            :
            <input type="text" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}}   />
           }
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" name="phone" id="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
        </div>
        <div>
          <label htmlFor="order">Order Number:</label>
        {data.email ? 
            <input type="text" name="order" id="order" value={order} onChange={(e) => {setOrder(e.target.value)}} />
            :
            <input type="text" name="order" id="order" value={''} disabled/>
           }

        </div>
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" cols="30" rows="10"  
          onChange={(e) => {setMessage(e.target.value)}}
        ></textarea>
      </div>
      <input type="submit" value="Send"/>
    </form>
  )
}
