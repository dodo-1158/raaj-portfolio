'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './about.module.css';
import Image from 'next/image';

const About = () => {
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={styles.aboutSection}
    >
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          {/* Content Section */}
          <div 
            className={`${styles.contentSection} ${
              isVisible ? styles.animateRight : ''
            }`}
          >
            <h2 className={styles.title}>
              A Journey From A Blank Slate To My Extraordinary Story!
            </h2>
            
            <div className={styles.textContent}>
              <p>
                I&apos;m Raaj Dhoundiyal, a filmmaker from (Pauri, Uttarakhand) with a 
                strong background in cinematography, editing, writing, and color 
                grading. After completing my studies, I further honed my skills through 
                specialized training in VFX Pro, Cinematography, Editing and Color 
                Grading at top institutions including MAAC (Maya Academy of 
                Advanced Cinematics) in Delhi, Maharaja Agrasen College in Delhi, 
                Shemaroo Institute of Film & Technology (SIFT) in Mumbai, and Zee 
                Institute of Media Arts (ZIMA) in Mumbai.
              </p>
              
              <p>
                I&apos;ve directed two short films: Parwaaz Ek Udaan (Best Trailer #1 at IFP 
                50-Hour Filmmaking Challenge, 2014) and Glaani (official selection at 
                Pune Short Film Festival, 2015). In 2019, I founded Vijesha Films. In 
                2022, I produced my first project, Mera Pahad Mera Himala, a real-life 
                inspired music video featured on Zee Music. Currently, I&apos;m working on 
                a documentary based in Uttarakhand, also under my production 
                company and I hope to keep entertaining you guys by 
                doing more projects.
              </p>
              
              <p>
                I believe in values, philosophy, or vision and am committed to what 
                drives you. Whether you&apos;re looking for service, collaboration, or 
                product, I&apos;d love to connect and see how we can work together.
              </p>
              
              <p>
                Feel free to contact, explore my portfolio.
              </p>
            </div>
            
            <a href="/contact" className={styles.hireBtn}>
              Hire Me Now
            </a>
          </div>

          {/* Image Section */}
          <div 
            className={`${styles.imageSection} ${
              isVisible ? styles.animateLeft : ''
            }`}
          >
            <div className={styles.imageContainer}>
              <div className={styles.glowBorder}></div>
              <Image 
                src="/aboutme.jpg" 
                alt="Raaj Dhoundiyal with camera equipment" 
                className={styles.aboutImage}
                height={400}
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
     
    </section>

  );
};

export default About;