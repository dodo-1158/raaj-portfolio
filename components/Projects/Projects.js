'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './projects.module.css';

const Projects = () => {
  // Delivered Projects Carousel
  const [deliveredCurrent, setDeliveredCurrent] = useState(0);
  const deliveredProjects = [
    { image: 'delivered-2.jpg', alt: 'Project 1' },
    { image: 'delivered-1.jpg', alt: 'Project 2' },
    { image: 'delivered-3.jpg', alt: 'Project 3' },
    { image: 'delivered-4.jpg', alt: 'Project 4' },
    { image: 'delivered-5.jpg', alt: 'Project 5' },
    { image: 'delivered-6.jpg', alt: 'Project 6' }
  ];
  const deliveredCount = deliveredProjects.length;

  // Upcoming Projects Carousel
  const [upcomingCurrent, setUpcomingCurrent] = useState(0);
  const upcomingProjects = [
    { image: 'upcoming-1.jpg', alt: 'Upcoming 1' },
    { image: 'upcoming-2.jpg', alt: 'Upcoming 2' },
    { image: 'upcoming-3.jpg', alt: 'Upcoming 3' },
    { image: 'upcoming-4.jpg', alt: 'Upcoming 4' },
    { image: 'upcoming-5.jpg', alt: 'Upcoming 5' },
    { image: 'upcoming-6.jpg', alt: 'Upcoming 6' },
    { image: 'upcoming-7.jpg', alt: 'Upcoming 7' },
    { image: 'upcoming-8.jpg', alt: 'Upcoming 8' }
  ];
  const upcomingCount = upcomingProjects.length;

  const dragThreshold = 60;
  const deliveredStartX = useRef(null);
  const upcomingStartX = useRef(null);




  function getVisibleSlides(projects, current, count) {
  const slides = [];
  // Show fewer slides on small screens
  const isSmallScreen = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const range = isSmallScreen ? 1 : 2; // 1 slide on each side for small screens

  for (let i = -range; i <= range; i++) {
    const idx = (current + i + count) % count;
    slides.push({
      ...projects[idx],
      position: i,
      isActive: i === 0
    });
  }
  return slides;
}

  // Delivered handlers
  const handleDeliveredStart = (e) => {
    deliveredStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleDeliveredEnd = (e) => {
    if (deliveredStartX.current === null) return;
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = x - deliveredStartX.current;
    if (delta > dragThreshold) setDeliveredCurrent((prev) => (prev - 1 + deliveredCount) % deliveredCount);
    if (delta < -dragThreshold) setDeliveredCurrent((prev) => (prev + 1) % deliveredCount);
    deliveredStartX.current = null;
  };

  // Upcoming handlers
  const handleUpcomingStart = (e) => {
    upcomingStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleUpcomingEnd = (e) => {
    if (upcomingStartX.current === null) return;
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = x - upcomingStartX.current;
    if (delta > dragThreshold) setUpcomingCurrent((prev) => (prev - 1 + upcomingCount) % upcomingCount);
    if (delta < -dragThreshold) setUpcomingCurrent((prev) => (prev + 1) % upcomingCount);
    upcomingStartX.current = null;
  };

  return (
    <>
    {/* Delivered Section */}
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Delivered Projects</h2>
          <p className={styles.subtitle}>LET&apos;S CRAFT SOMETHING EXTRAORDINARY</p>
        </div>
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={() => setDeliveredCurrent((prev) => (prev - 1 + deliveredCount) % deliveredCount)} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className={styles.carousel}
            onMouseDown={handleDeliveredStart}
            onMouseUp={handleDeliveredEnd}
            onMouseLeave={handleDeliveredEnd}
            onTouchStart={handleDeliveredStart}
            onTouchEnd={handleDeliveredEnd}
          >
            <div className={styles.slideContainer}>
              {getVisibleSlides(deliveredProjects, deliveredCurrent, deliveredCount).map((slide, idx) => (
                <div
                  key={slide.image + idx}
                  className={`${styles.slide} ${slide.isActive ? styles.activeSlide : styles.inactiveSlide}`}
                >
                  <div className={styles.projectCard}>
                    <Image
                      src={`/${slide.image}`}
                      alt={slide.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={styles.projectImage}
                      priority={slide.isActive}
                    />
                    {!slide.isActive && <div className={styles.overlay}></div>}
                  </div>
                </div>
              ))}
            </div>

          </div>
          <button className={styles.navButton} onClick={() => setDeliveredCurrent((prev) => (prev + 1) % deliveredCount)} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className={styles.carouselWhiteBg}></div>
    </section>

    {/* Upcoming Section */}
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Upcoming Projects</h2>
          <p className={styles.subtitle}>LET&apos;S TURN DREAMS INTO REALITY</p>
        </div>
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={() => setUpcomingCurrent((prev) => (prev - 1 + upcomingCount) % upcomingCount)} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className={styles.carousel}
            onMouseDown={handleUpcomingStart}
            onMouseUp={handleUpcomingEnd}
            onMouseLeave={handleUpcomingEnd}
            onTouchStart={handleUpcomingStart}
            onTouchEnd={handleUpcomingEnd}
          >
            <div className={styles.slideContainer}>
              {getVisibleSlides(upcomingProjects, upcomingCurrent, upcomingCount).map((slide, idx) => (
                <div
                  key={slide.image + idx}
                  className={`${styles.slide} ${slide.isActive ? styles.activeSlide : styles.inactiveSlide}`}
                >
                  <div className={styles.projectCard}>
                    <Image
                      src={`/${slide.image}`}
                      alt={slide.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={styles.projectImage}
                      priority={slide.isActive}
                    />
                    {!slide.isActive && <div className={styles.overlay}></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.navButton} onClick={() => setUpcomingCurrent((prev) => (prev + 1) % upcomingCount)} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className={styles.carouselWhiteBg}></div>
    </section>
    </>
  );
};

 export default Projects;



// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import styles from './projects.module.css';

// const Projects = () => {
//   // Delivered Projects Carousel
//   const [deliveredCurrent, setDeliveredCurrent] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const deliveredProjects = [
//     { image: 'delivered-1.jpg', alt: 'Project 1' },
//     { image: 'delivered-2.jpg', alt: 'Project 2' },
//     { image: 'delivered-3.jpg', alt: 'Project 3' },
//     { image: 'delivered-4.jpg', alt: 'Project 4' },
//     { image: 'delivered-5.jpg', alt: 'Project 5' },
//     { image: 'delivered-6.jpg', alt: 'Project 6' }
//   ];
//   const deliveredCount = deliveredProjects.length;

//   // Upcoming Projects Carousel
//   const [upcomingCurrent, setUpcomingCurrent] = useState(0);
//   const upcomingProjects = [
//     { image: 'upcoming-1.jpg', alt: 'Upcoming 1' },
//     { image: 'upcoming-2.jpg', alt: 'Upcoming 2' },
//     { image: 'upcoming-3.jpg', alt: 'Upcoming 3' },
//     { image: 'upcoming-4.jpg', alt: 'Upcoming 4' },
//     { image: 'upcoming-5.jpg', alt: 'Upcoming 5' },
//     { image: 'upcoming-6.jpg', alt: 'Upcoming 6' },
//     { image: 'upcoming-7.jpg', alt: 'Upcoming 7' },
//     { image: 'upcoming-8.jpg', alt: 'Upcoming 8' }
//   ];
//   const upcomingCount = upcomingProjects.length;

//   const dragThreshold = 50;
//   const deliveredStartX = useRef(null);
//   const upcomingStartX = useRef(null);
//   const deliveredStartTime = useRef(null);
//   const upcomingStartTime = useRef(null);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     // Set initial value
//     if (typeof window !== 'undefined') {
//       handleResize();
//       window.addEventListener('resize', handleResize);
//     }
    
//     return () => {
//       if (typeof window !== 'undefined') {
//         window.removeEventListener('resize', handleResize);
//       }
//     };
//   }, []);

//   function getVisibleSlides(projects, current, count) {
//     const slides = [];
//     // Show only 1 slide on each side for mobile (total 3), 2 on each side for desktop (total 5)
//     const range = isMobile ? 1 : 2;

//     for (let i = -range; i <= range; i++) {
//       const idx = (current + i + count) % count;
//       slides.push({
//         ...projects[idx],
//         position: i,
//         isActive: i === 0
//       });
//     }
//     return slides;
//   }

//   // Delivered handlers
//   const handleDeliveredStart = (e) => {
//     e.preventDefault();
//     deliveredStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
//     deliveredStartTime.current = Date.now();
//   };
  
//   const handleDeliveredEnd = (e) => {
//     if (deliveredStartX.current === null) return;
    
//     const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//     const delta = x - deliveredStartX.current;
//     const timeDelta = Date.now() - deliveredStartTime.current;
    
//     // Only trigger if it's a swipe (not just a tap) and meets threshold
//     if (timeDelta < 500 && Math.abs(delta) > dragThreshold) {
//       if (delta > 0) {
//         setDeliveredCurrent((prev) => (prev - 1 + deliveredCount) % deliveredCount);
//       } else {
//         setDeliveredCurrent((prev) => (prev + 1) % deliveredCount);
//       }
//     }
    
//     deliveredStartX.current = null;
//     deliveredStartTime.current = null;
//   };

//   // Upcoming handlers
//   const handleUpcomingStart = (e) => {
//     e.preventDefault();
//     upcomingStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
//     upcomingStartTime.current = Date.now();
//   };
  
//   const handleUpcomingEnd = (e) => {
//     if (upcomingStartX.current === null) return;
    
//     const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//     const delta = x - upcomingStartX.current;
//     const timeDelta = Date.now() - upcomingStartTime.current;
    
//     // Only trigger if it's a swipe (not just a tap) and meets threshold
//     if (timeDelta < 500 && Math.abs(delta) > dragThreshold) {
//       if (delta > 0) {
//         setUpcomingCurrent((prev) => (prev - 1 + upcomingCount) % upcomingCount);
//       } else {
//         setUpcomingCurrent((prev) => (prev + 1) % upcomingCount);
//       }
//     }
    
//     upcomingStartX.current = null;
//     upcomingStartTime.current = null;
//   };

//   return (
//     <>
//     {/* Delivered Section */}
//     <section className={styles.projectsSection}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2 className={styles.title}>My Delivered Projects</h2>
//           <p className={styles.subtitle}>LET&apos;S CRAFT SOMETHING EXTRAORDINARY</p>
//         </div>
//         <div className={styles.carouselContainer}>
//           <button 
//             className={styles.navButton} 
//             onClick={() => setDeliveredCurrent((prev) => (prev - 1 + deliveredCount) % deliveredCount)} 
//             aria-label="Previous slide"
//           >
//             <i className="fas fa-chevron-left"></i>
//           </button>
//           <div className={styles.carousel}
//             onMouseDown={handleDeliveredStart}
//             onMouseUp={handleDeliveredEnd}
//             onMouseLeave={handleDeliveredEnd}
//             onTouchStart={handleDeliveredStart}
//             onTouchEnd={handleDeliveredEnd}
//             onTouchCancel={handleDeliveredEnd}
//           >
//             <div className={styles.slideContainer}>
//               {getVisibleSlides(deliveredProjects, deliveredCurrent, deliveredCount).map((slide, idx) => (
//                 <div
//                   key={slide.image + idx}
//                   className={`${styles.slide} ${slide.isActive ? styles.activeSlide : styles.inactiveSlide}`}
//                 >
//                   <div className={styles.projectCard}>
//                     <Image
//                       src={`/${slide.image}`}
//                       alt={slide.alt}
//                       fill
//                       style={{ objectFit: 'cover' }}
//                       className={styles.projectImage}
//                       priority={slide.isActive}
//                     />
//                     {!slide.isActive && <div className={styles.overlay}></div>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button 
//             className={styles.navButton} 
//             onClick={() => setDeliveredCurrent((prev) => (prev + 1) % deliveredCount)} 
//             aria-label="Next slide"
//           >
//             <i className="fas fa-chevron-right"></i>
//           </button>
//         </div>
//       </div>
//       <div className={styles.carouselWhiteBg}></div>
//     </section>

//     {/* Upcoming Section */}
//     <section className={styles.projectsSection}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2 className={styles.title}>My Upcoming Projects</h2>
//           <p className={styles.subtitle}>LET&apos;S TURN DREAMS INTO REALITY</p>
//         </div>
//         <div className={styles.carouselContainer}>
//           <button 
//             className={styles.navButton} 
//             onClick={() => setUpcomingCurrent((prev) => (prev - 1 + upcomingCount) % upcomingCount)} 
//             aria-label="Previous slide"
//           >
//             <i className="fas fa-chevron-left"></i>
//           </button>
//           <div className={styles.carousel}
//             onMouseDown={handleUpcomingStart}
//             onMouseUp={handleUpcomingEnd}
//             onMouseLeave={handleUpcomingEnd}
//             onTouchStart={handleUpcomingStart}
//             onTouchEnd={handleUpcomingEnd}
//             onTouchCancel={handleUpcomingEnd}
//           >
//             <div className={styles.slideContainer}>
//               {getVisibleSlides(upcomingProjects, upcomingCurrent, upcomingCount).map((slide, idx) => (
//                 <div
//                   key={slide.image + idx}
//                   className={`${styles.slide} ${slide.isActive ? styles.activeSlide : styles.inactiveSlide}`}
//                 >
//                   <div className={styles.projectCard}>
//                     <Image
//                       src={`/${slide.image}`}
//                       alt={slide.alt}
//                       fill
//                       style={{ objectFit: 'cover' }}
//                       className={styles.projectImage}
//                       priority={slide.isActive}
//                     />
//                     {!slide.isActive && <div className={styles.overlay}></div>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button 
//             className={styles.navButton} 
//             onClick={() => setUpcomingCurrent((prev) => (prev + 1) % upcomingCount)} 
//             aria-label="Next slide"
//           >
//             <i className="fas fa-chevron-right"></i>
//           </button>
//         </div>
//       </div>
//       <div className={styles.carouselWhiteBg}></div>
//     </section>
//     </>
//   );
// };

// export default Projects;