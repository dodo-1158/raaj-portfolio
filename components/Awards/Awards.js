'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './awards.module.css';

const Awards = () => {
  const awards = [
    {
      image: 'Glaani-Pune-Film-Festival.png',
      alt: 'Pune Short Film Festival 2015'
    },
    {
      image: 'Glaani-Award.png',
      alt: 'Glaani Official Selection 5th Pune Short Film Festival 2015'
    },
    {
      image: 'Parwaaz-Ek-Udaan-Award.png',
      alt: 'Parwaaz Ek Udaan Best Trailer #1 IFP 2014'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds (only on small screens)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 480px)');
    if (!mediaQuery.matches) return; // Disable auto-slide on desktop

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % awards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [awards.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? awards.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % awards.length);
  };

  return (
    <section className={styles.awardsSection}>
      <div className={styles.backgroundImage}>
        <Image
          src="/award-background.jpg"
          alt="Award background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Winning awards</h2>
          <p className={styles.quote}>
            &quot;SUCCESS ISN&apos;T A DESTINATION, IT&apos;S A PATH YOU WALK. DREAM BOLDLY,<br />
            PUT IN THE EFFORT, AND REACH FOR EXCELLENCE&quot;
          </p>
        </div>

        {/* Desktop / tablet grid */}
        <div className={styles.awardsGrid}>
          {awards.map((award, index) => (
            <div key={index} className={styles.awardItem}>
              <Image
                src={`/${award.image}`}
                alt={award.alt}
                width={400}
                height={400}
                className={styles.awardImage}
              />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={styles.carousel}>
          <button className={styles.prev} onClick={prevSlide}>
  <i className="fa-solid fa-chevron-left"></i>
</button>


          <div className={styles.carouselImage}>
            <Image
              src={`/${awards[currentIndex].image}`}
              alt={awards[currentIndex].alt}
              width={300}
              height={300}
              className={styles.awardImage}
            />
          </div>

          <button className={styles.next} onClick={nextSlide}>
  <i className="fa-solid fa-chevron-right"></i>
</button>
        </div>
      </div>
    </section>
  );
};

export default Awards;
