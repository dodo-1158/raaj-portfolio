// 'use client';
// import { useState, useEffect , useRef} from 'react';
// import styles from './page.module.css';
// import Image from 'next/image';
// import Link from 'next/link';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import About from '@/components/About/About';
// import Services from '@/components/Services/Services';
// import Awards from '@/components/Awards/Awards';
// import Projects from '@/components/Projects/Projects';
// import Work from '@/components/Work/Work';
// import WorkedWith from '@/components/WorkedWith/WorkedWith';

// export default function Home() {

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [fadeIn, setFadeIn] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [animationKey, setAnimationKey] = useState(0); // Add this for animation reset

//   const slides = [
//     {
//       id: 1,
//       upperText: "My Story",
//       mainText: "BEGINS HERE",
//       subText: "I CAN GIVE YOU EVERYTHING YOU NEED!",
//       backgroundImage: "/homepage-4.jpg"
//     },
//     {
//       id: 2,
//       upperText: "Your Vision, My Art",
//       mainText: "A NEW PATH EMERGES",
//       subText: "",
//       backgroundImage: "/homepage-2.jpg"
//     },
//     {
//       id: 3,
//       upperText: "Your Story, My Magic",
//       mainText: "A NEW CHAPTER UNFOLDS",
//       subText: "",
//       backgroundImage: "/homepage-3.jpg"
//     }
//   ];

//   useEffect(() => {
//     setFadeIn(true);
    
//     // Auto-change slides every 5 seconds
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => {
//         const newSlide = (prev + 1) % slides.length;
//         setAnimationKey(prev => prev + 1); // Reset animations
//         return newSlide;
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   useEffect(() => {
//     const onScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     const onResize = () => {
//       if (window.innerWidth > 1024) {
//         setIsMobileMenuOpen(false);
//       }
//     };
    
//     window.addEventListener('scroll', onScroll);
//     window.addEventListener('resize', onResize);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onResize);
//     };
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide(prev => (prev + 1) % slides.length);
//     setAnimationKey(prev => prev + 1); // Reset animations
//   };

//   const prevSlide = () => {
//     setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
//     setAnimationKey(prev => prev + 1); // Reset animations
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(prev => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -100px 0px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const createWaveText = (text) => {
//   return text.split(" ").map((word, wordIndex) => (
//     <span 
//       key={`${animationKey}-word-${wordIndex}`}
//       style={{ 
//         display: 'inline-block',
//         marginRight: '0.3em'
//       }}
//     >
//       {word.split("").map((char, charIndex) => (
//         <span 
//           key={`${animationKey}-${wordIndex}-${charIndex}`}
//           style={{ 
//             animationDelay: `${0.6 + (wordIndex * 0.3) + (charIndex * 0.05)}s`,
//             display: 'inline-block'
//           }}
//         >
//           {char}
//         </span>
//       ))}
//     </span>
//   ));
// };

//   return (
//     <main className={styles.main}>
//       <nav className={`${styles.navbar} ${isScrolled ? styles.navScrolled : ''}`}>
//         <div>
//           <Link href="/">
//             <Image 
//               src="/Raaj-Logo1.png" 
//               alt="Logo"  
//               width={150}   
//               height={0}   
//               style={{ height: "auto" }} 
//               className={styles.navLogo} 
//             />
//           </Link>
//         </div>
        
//         {/* Desktop Navigation Links */}
//         <div className={styles.navLinks}>
//           <a href="#about" className={styles.navLink}>ABOUT ME</a>
//           <a href="#work" className={styles.navLink}>MY WORK</a>
//           <a href="#gallery" className={styles.navLink}>GALLERY</a>
//           <a href="/contact" className={styles.navLink}>CONTACT ME</a>
//         </div>

//         {/* Burger Menu with FontAwesome Icons */}
//         <div className={styles.burgerMenu} onClick={toggleMobileMenu}>
//           <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
//         <a href="#about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
//           ABOUT ME
//         </a>
//         <a href="#work" className={styles.mobileNavLink} onClick={closeMobileMenu}>
//           MY WORK
//         </a>
//         <a href="#gallery" className={styles.mobileNavLink} onClick={closeMobileMenu}>
//           GALLERY
//         </a>
//         <a href="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
//           CONTACT ME
//         </a>
//       </div>

//       {/* Hero Carousel */}
//       <section className={`${styles.heroCarousel} ${fadeIn ? styles.fadeIn : ''}`}>
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`${styles.slide} ${
//               index === currentSlide ? styles.active : ''
//             }`}
//             style={{
//               backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), 
//               url(${slide.backgroundImage})`
//             }}
//           >
//             <div className={styles.slideContent}>
//               <div key={`${slide.id}-${animationKey}`} className={styles.textContent}>
//                 <div className={styles.upperText}>{slide.upperText}</div>

//                 <div className={`${styles.mainText} ${styles.wave}`}>
//                   {createWaveText(slide.mainText)}
//                 </div>

//                 {slide.subText && <div className={styles.subText}>{slide.subText}</div>}

//                 <Link href="/contact">
//                   <button className={styles.cta}>Hire Me Now</button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Navigation Arrows */}
//         <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevSlide}>
//           <span className={styles.icon}><i className="fa fa-chevron-left"></i></span>
//         </button>
//         <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextSlide}>
//          <span className={styles.icon}><i className="fa fa-chevron-right"></i></span>
//         </button>
//       </section>

//       <section id="about" ref={sectionRef}>
//         <About />
//       </section>

//       <section id="services">
//         <Services />
//       </section>

//       <section id="work">
//         <Work />
//       </section>

//       <section id="awards">
//         <Awards />
//       </section>

//       <section id="gallery">
//        <Projects />
//        <WorkedWith />
//       </section>
//     </main>
//   );
// }

'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Awards from '@/components/Awards/Awards';
import Projects from '@/components/Projects/Projects';
import Work from '@/components/Work/Work';
import WorkedWith from '@/components/WorkedWith/WorkedWith';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      upperText: "My Story",
      mainText: "BEGINS HERE",
      subText: "I CAN GIVE YOU EVERYTHING YOU NEED!",
      backgroundImage: "/homepage-1.jpg"
    },
    {
      id: 2,
      upperText: "Your Vision, My Art",
      mainText: "A NEW PATH EMERGES",
      subText: "",
      backgroundImage: "/homepage-2.jpg"
    },
    {
      id: 3,
      upperText: "Your Story, My Magic",
      mainText: "A NEW CHAPTER UNFOLDS",
      subText: "",
      backgroundImage: "/homepage-3.jpg"
    }
  ];

  useEffect(() => {
    setFadeIn(true);
    
    // Auto-change slides every 5 seconds
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide(prev => {
          const newSlide = (prev + 1) % slides.length;
          setAnimationKey(prev => prev + 1);
          return newSlide;
        });
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1200);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isTransitioning]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    const onResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setAnimationKey(prev => prev + 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setAnimationKey(prev => prev + 1);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const createWaveText = (text) => {
    return text.split(" ").map((word, wordIndex) => (
      <span 
        key={`${animationKey}-word-${wordIndex}`}
        style={{ 
          display: 'inline-block',
          marginRight: '0.3em'
        }}
      >
        {word.split("").map((char, charIndex) => (
          <span 
            key={`${animationKey}-${wordIndex}-${charIndex}`}
            style={{ 
              animationDelay: `${0.4 + (wordIndex * 0.2) + (charIndex * 0.03)}s`,
              display: 'inline-block'
            }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <main className={styles.main}>
      <nav className={`${styles.navbar} ${isScrolled ? styles.navScrolled : ''}`}>
        <div>
          <Link href="/">
            <Image 
              src="/Raaj-Logo1.png" 
              alt="Logo"  
              width={150}   
              height={0}   
              style={{ height: "auto" }} 
              className={styles.navLogo} 
            />
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>ABOUT ME</a>
          <a href="#work" className={styles.navLink}>MY WORK</a>
          <a href="#gallery" className={styles.navLink}>GALLERY</a>
          <a href="/contact" className={styles.navLink}>CONTACT ME</a>
        </div>

        {/* Burger Menu with FontAwesome Icons */}
        <div className={styles.burgerMenu} onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <a href="#about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          ABOUT ME
        </a>
        <a href="#work" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          MY WORK
        </a>
        <a href="#gallery" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          GALLERY
        </a>
        <a href="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          CONTACT ME
        </a>
      </div>

      {/* Hero Carousel */}
      <section className={`${styles.heroCarousel} ${fadeIn ? styles.fadeIn : ''}`}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ''
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), 
              url(${slide.backgroundImage})`
            }}
          >
            <div className={styles.slideContent}>
              <div key={`${slide.id}-${animationKey}`} className={styles.textContent}>
                <div className={styles.upperText}>{slide.upperText}</div>

                <div className={`${styles.mainText} ${styles.wave}`}>
                  {createWaveText(slide.mainText)}
                </div>

                {slide.subText && <div className={styles.subText}>{slide.subText}</div>}

                <Link href="/contact">
                  <button className={styles.cta}>Hire Me Now</button>
                </Link>
                {/* <a href="/contact">
                  <button className={styles.cta}>Hire Me Now</button>
                </a> */}
                
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevSlide}>
          <span className={styles.icon}><i className="fa fa-chevron-left"></i></span>
        </button>
        <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextSlide}>
         <span className={styles.icon}><i className="fa fa-chevron-right"></i></span>
        </button>
      </section>

      <section id="about" ref={sectionRef}>
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="work">
        <Work />
      </section>

      <section id="awards">
        <Awards />
      </section>

      <section id="gallery">
       <Projects />
       <WorkedWith />
      </section>
    </main>
  );
}