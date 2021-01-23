import {useEffect} from 'react'
import styles from '../styles/PagesControls.module.css'

export default function PagesControls({props}) {
  const {current, pages, changePage} = props

  return (
    <>
      <div className={styles.wrapper}>
          {current < 3 && (
            <>
            <button onClick={() => changePage(current - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </button>
            <button onClick={() => changePage(1)} className={current === 1 ? styles.active : ''}>1</button>
            {pages > 1 && <button onClick={() => changePage(2)} className={current === 2 ? styles.active : ''}>2</button>}
            {pages > 2 && <button onClick={() => changePage(3)}>{3}</button>}
            <button onClick={() => changePage(current + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            </button>
            </>
          )}
          {current > 2 && current < (pages - 1) && (
            <>
            <button onClick={() => changePage(current - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </button>
            <button onClick={() => changePage(current - 1)}>{current - 1}</button>
            <button onClick={() => changePage(current)} className={styles.active}>{current}</button>
            <button onClick={() => changePage(current + 1)}>{current + 1}</button>
            <button onClick={() => changePage(current + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            </button>
            </>
          )}
          {((current > 2) && (current > (pages - 2))) && (
            <>
            <button onClick={() => changePage(current - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
            </button>
            <button onClick={() => changePage(pages - 2)} className={current === (pages - 2) ? styles.active : ''}>{pages - 2}</button>
            <button onClick={() => changePage(pages - 1)} className={current === (pages - 1) ? styles.active : ''}>{pages - 1}</button>
            <button onClick={() => changePage(pages)} className={current === pages ? styles.active : ''}>{pages}</button>
            <button onClick={() => changePage(current + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
            </button>
            </>
          )}
        </div>
    </>
  )
}
