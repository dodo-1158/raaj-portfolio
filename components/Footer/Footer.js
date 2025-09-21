// 'use client'
// import Image from 'next/image'
// import React from 'react'
// import styles from './Footer.module.css'
// const Footer = () => {
//   return (
//     <>
//     {/* Footer */}
//       <footer className={styles.footer}>
//         <div className={styles.footerlogo}>
//           <Image src="/footerLogo.png" alt="Logo" width={40} height={40} />
//         </div>
//         <div className={styles.footerContent}>
//           ©Copyright 2025, Raaj Dhoundiyal
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       <button 
//         className={styles.scrollToTop}
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//       >
//         <svg 
//           width="16" 
//           height="16" 
//           viewBox="0 0 24 24" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path 
//             d="M7 14L12 9L17 14" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>
//     </>
//   )
// }

// export default Footer

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerlogo}>
          <Image className={styles.footerlogoImg} src="/footerLogo.png" alt="Logo" width={120} height={120} quality={100}/>
        </div>
        <div className={styles.footerContent}>
          <span className={styles.line}></span>
          © Copyright 2025, Raaj Dhoundiyal
          <span className={styles.line}></span>
        </div>
      </footer>

      {showScroll && (
        <button 
          className={styles.scrollToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7 14L12 9L17 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default Footer
