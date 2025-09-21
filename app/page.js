'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Awards from '@/components/Awards/Awards';
import Projects from '@/components/Projects/Projects';


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const slides = [
    {
      id: 1,
      upperText: "My Story",
      mainText: "BEGINS HERE",
      subText: "I CAN GIVE YOU EVERYTHING YOU NEED!",
      backgroundImage: "/homepage-1.jpg" // Desktop setup image
    },
    {
      id: 2,
      upperText: "Your Vision, My Art",
      mainText: "A New Path Emerges",
      subText: "",
      backgroundImage: "/homepage-2.jpg" // Camera equipment image
    },
    {
      id: 3,
      upperText: "Your Story, My Magic",
      mainText: "A New Chapter Unfolds",
      subText: "",
      backgroundImage: "/homepage-3.jpg" // Camera equipment image
    }

  ];

  useEffect(() => {
    setFadeIn(true);
    
    // Auto-change slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
 
        <div >
          <div>
            <Link href="/">
            <Image src="/Raaj-Logo1.png" alt="Logo"  width={150}   // set width in px
  height={0}   
  style={{ height: "auto" }}  />
  </Link>
          </div>
          
        </div>
        

        <div className={styles.navLinks}>
          <a href="#about"  className={styles.navLink}>ABOUT ME</a>
          <a href="#work" className={styles.navLink}>MY WORK</a>
          <a href="#gallery" className={styles.navLink}>GALLERY</a>
          <a href="/contact" className={styles.navLink}>CONTACT ME</a>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className={`${styles.heroCarousel} ${fadeIn ? styles.fadeIn : ''}`}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ''
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.backgroundImage})`
            }}
          >
            <div className={styles.slideContent}>
              <div className={styles.textContent}>
                <div className={`${styles.upperText} ${styles.slideInDown}`}>
                  {slide.upperText}
                </div>
               <div className={`${styles.mainText} ${styles.slideInUp}`}>
                  {slide.mainText}
                </div> 
                {slide.subText && (
                  <div className={`${styles.subText} ${styles.slideInUp}`}>
                    {slide.subText}
                  </div>
                )}
                <Link href="/contact" passHref>
                <button className={`${styles.cta} ${styles.slideInUp}`}>
                  Hire Me Now
                </button>
                </Link>
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

<section id="about">
  <About />
</section>

<section id="services">
<Services />
</section>

<section id="work">
  {/* My Work Content */}
</section>

<section id="awards">
<Awards />
</section>

<section id="gallery">
 <Projects />
</section>

    </main>
  );
}