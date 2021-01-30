import {useEffect, useState} from 'react'
import styles from '../styles/ImageSlider.module.css'

export default function ImageSlider({images_link}) {

  const [clicked, setClicked] = useState(false)
  const [index, setIndex] = useState(0)
  const [images, setImages] = useState(0)
  

  const [currentImg, setCurrentImg] = useState(null);
  const [nextImg, setNextImg] = useState(null);
  const [prevImg, setPrevImg] = useState(null);

  
  const [imgWidth, setImgWidth] = useState(0)
  
  const [initialPosition, setInitialPosition] = useState(0)

  const dragImage = (e) => {
    e.preventDefault()
    if(!clicked) return
    let x;
    if(!e.clientX) {
      const touch = e.touches[0];
      x = touch.clientX;
    } else {
      x = e.clientX
    }
    const xWalk =  x - initialPosition 
    currentImg.style.left = `${xWalk}px`
    if(xWalk < 0) {
      nextImg.style.left = `${xWalk + imgWidth}px`
    } else {
      prevImg.style.left = `${-imgWidth + xWalk}px`
    }
  }

  const captureClick = (e, button = null) => {
    e.preventDefault()
    if(!images) return
    setClicked(true)

    if(e.clientX) {
      setInitialPosition(e.clientX)
    } else {
      const touch = e.touches[0];
      setInitialPosition(touch.clientX)
    }

    // console.log('Capture Click', index)

    currentImg.classList.remove(styles.image_wrapper_transition)
    nextImg.classList.remove(styles.image_wrapper_transition)
    prevImg.classList.remove(styles.image_wrapper_transition)
    
    if(button === true) {
      currentImg.style.left = `${0}px`
      prevImg.style.left = `${-imgWidth}px`
      nextImg.style.left = `${imgWidth}px`
    } else if(button === false) {
      currentImg.style.left = `${0}px`
      nextImg.style.left = `${imgWidth}px`
      prevImg.style.left = `${-imgWidth}px`
    }

    setImgWidth(currentImg.getBoundingClientRect().width)

    currentImg.style.zIndex = '2'
    nextImg.style.zIndex = '0'
    prevImg.style.zIndex = '0'
  }

  const captureStop = (e, button = null) => {
    if(!images) return
    if(!clicked) return
    setClicked(false)

    // console.log('Capture Stop', index)

    currentImg.classList.add(styles.image_wrapper_transition)
    nextImg.classList.add(styles.image_wrapper_transition)
    prevImg.classList.add(styles.image_wrapper_transition)

    let x;
    if(!e.clientX) {
      x = e.changedTouches[0].clientX;
    } else {
      x = e.clientX
    }
    const difference = initialPosition - x
    const threshold = imgWidth * 0.2
    
    if(threshold > Math.abs(difference) && button === null) {
      if(difference > 0) {
        nextImg.style.left = `${imgWidth}px`
        currentImg.style.left = `0px`
      } else {
        currentImg.style.left = `0px`
        prevImg.style.left = `${-imgWidth}px`
      }

    } else if(0 > difference || button === false) {
      moveRight()
      updateImagesRoles('right')
    } else if(0 < difference || button === true) {
      moveLeft()
      updateImagesRoles('left')
    }
  }

  const moveRight = () => {
    nextImg.style.left = `${imgWidth*2}px`
    currentImg.style.left = `${imgWidth}px`
    prevImg.style.left = `${0}px`

    nextImg.style.zIndex = `0`
    currentImg.style.zIndex = `0`
    prevImg.style.zIndex = '2'

  }
  const moveLeft = () => {
    prevImg.style.left = `${-imgWidth*2}px`
    currentImg.style.left = `${-imgWidth}px`
    nextImg.style.left = `${0}px`

    nextImg.style.zIndex = `0`
    currentImg.style.zIndex = `0`
    prevImg.style.zIndex = '2'
  }

  const updateImagesRoles = (side) => {
    if(side === 'left') {
      // console.log('Update To the Left')
      if(index === images.length - 1) {

        setCurrentImg(images[0])
        setPrevImg(images[images.length - 1])
        setNextImg(images[1])

        setIndex(0)
      } else {

        setCurrentImg(images[index + 1])
        setPrevImg(images[index])
        
        if(images[index + 2]) {
          setNextImg(images[index + 2])
        } else {
          setNextImg(images[0])
        }

        setIndex(index + 1)
      }
    }

    if(side === 'right') {
      // console.log('Update To the Right')
      if(index === 0){

        setCurrentImg(images[images.length - 1])
        setNextImg(images[index])
        setPrevImg(images[((images.length - 1)- 1)])

        setIndex(images.length - 1)

      } else {
        setCurrentImg(images[index - 1])
        setNextImg(images[index])

        if(images[index - 2]) {
          setPrevImg(images[index - 2])
        } else {
          setPrevImg(images[images.length - 1])
        }

        setIndex(index - 1)
      }
    }
  }

  const throttled = (delay, fn) => {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  const onMouseMove = throttled(10, dragImage);
  const onTouchMove = throttled(10, dragImage);

  useEffect(() => {
    const wrapperDOM = document.getElementById('image-wrapper')
    const imagesDOM = wrapperDOM.children
    const w = imagesDOM[index].getBoundingClientRect().width

    setImgWidth(w)
    
    setCurrentImg(imagesDOM[index])
    setNextImg(imagesDOM[index + 1])
    setPrevImg(imagesDOM[imagesDOM.length - 1])

    imagesDOM[index + 1].style.left = `${w}px`
    imagesDOM[index].style.left = `${0}px`
    imagesDOM[imagesDOM.length - 1].style.left = `${-w}px`

    for (let i = 0; i < imagesDOM.length; i++) {
      imagesDOM[i].classList.add(styles.loaded);
    }

    imagesDOM[index].classList.add(styles.active)

    
    setImages([...imagesDOM])
  }, [])

  return (
    <>
      <div 
        className={styles.overlay} 
        onMouseMove={onMouseMove}
        onMouseDown={captureClick}
        onMouseUp={captureStop}
        onMouseLeave={captureStop}

        onTouchMove={onTouchMove}
        onTouchStart={captureClick}
        onTouchEnd={captureStop}
      >
      </div>

        <button
        onMouseDown={(e) => {captureClick(e, false)}}
        onMouseUp={(e) => {captureStop(e, false)}}
        className={styles.left_btn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
          </svg>
        </button>
        <button
        onMouseDown={(e) => {captureClick(e, true)}}
        onMouseUp={(e) => {captureStop(e, true)}}
        className={styles.right_btn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </button>

        
      <div id={'image-wrapper'} className={styles.images_wrapper}>
        {images_link.map((image, i) => (
          <div key={image} className={styles.image_wrapper}>
            <div className={styles.image_wrapper_content}>
              <div>
                <h2>Online Shop</h2>
                <p>Welcome, we offer the best dishes.</p>
              </div>
            </div>
            <img className={styles.image_wrapper_img} src={image}></img>
          </div>
        ))}
      </div>
    </>
  )
}
