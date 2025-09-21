'use client';
import { useEffect, useRef, useState } from 'react';
 import Image from 'next/image';
import styles from './services.module.css';

const Services = () => {
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
        threshold: 0.1, // Reduced threshold for mobile
        rootMargin: '0px' // Removed negative margin that could cause issues
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

  const services = [
    {
      image: 'write.png',
      title: 'Writing',
      description: 'Writing is using words to express ideas, share information, or tell stories. It can create books, articles, poems, or messages to inform, entertain, or connect people.'
    },
    {
      image: 'direct.png',
      title: 'Direction',
      description: 'Film direction is guiding a film\'s creative elements, like acting, visuals, and pacing. A director shapes the story and overall vision to create engaging films that entertain or inspire.'
    },
    {
      image: 'color.png',
      title: 'Color Grading',
      description: 'Color grading is adjusting a film\'s colors and tones to create mood, style, or fix issues, enhancing the overall visual impact and storytelling.'
    },
    {
      image: 'edit.png',
      title: 'Editing',
      description: 'Editing is shaping and refining footage or content to create a polished final product, improving flow, pacing, and clarity.'
    },
    {
      image: 'camera.png',
      title: 'Cinematography',
      description: 'Cinematography is the art of capturing visuals through camera work and lighting, setting the film\'s mood and style, and enhancing storytelling.'
    }
  ];

  return (
    <section ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Services</h2>
          <p className={styles.subtitle}>LET&apos;S MAKE GREAT THINGS TOGETHER</p>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className={`${styles.serviceCard} ${isVisible ? styles.bounceIn : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.iconContainer}>
                <Image
                  src={`/${service.image}`}
                  alt={service.title}
                  width={100}
                  height={100}
                  className={styles.serviceIcon}
                />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;