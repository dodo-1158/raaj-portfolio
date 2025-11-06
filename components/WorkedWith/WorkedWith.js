// import Image from 'next/image';
// import styles from './workedwith.module.css';

// export default function WorkedWith() {
//   const collaborations = [
//     { 
//       id: 1, 
//       type: 'rectangle', 
//       alt: 'Collaboration 1',
//       src: '/workwith-1.jpg' // Update with your image path
//     },
//     { 
//       id: 2, 
//       type: 'rectangle', 
//       alt: 'Collaboration 2',
//       src: '/workwith-2.jpeg' // Update with your image path
//     },
//     { 
//       id: 3, 
//       type: 'square', 
//       alt: 'Collaboration 3',
//       src: '/workwith-3.jpeg' // Update with your image path
//     },
//     { 
//       id: 4, 
//       type: 'square', 
//       alt: 'Collaboration 4',
//       src: '/workwith-4.jpeg' // Update with your image path
//     },
//     { 
//       id: 5, 
//       type: 'square', 
//       alt: 'Collaboration 4',
//       src: '/workwith-5.jpg' // Update with your image path
//     },
//     { 
//       id: 6, 
//       type: 'square', 
//       alt: 'Collaboration 4',
//       src: '/workwith-6.jpg' 
//     }
//   ];

//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>
//         {/* Header */}
//         <div className={styles.header}>
//           <h2 className={styles.title}>
//             Notable Collaborations
//           </h2>
//           <p className={styles.subtitle}>
//             Bringing stories to life through partnerships with talented artists and visionaries
//           </p>
//         </div>

//         {/* Image Grid */}
//         <div className={styles.grid}>
//           {collaborations.map((collab) => (
//             <div
//               key={collab.id}
//               className={`${styles.gridItem} ${
//                 collab.type === 'rectangle' ? styles.rectangle : styles.square
//               }`}
//             >
//               <div className={styles.imageWrapper}>
//                 <Image
//                   src={collab.src}
//                   alt={collab.alt}
//                   fill
//                   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   style={{ objectFit: 'contain' }}
//                 />
//               </div>
//               <div className={styles.overlay} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './workedwith.module.css';

export default function WorkedWith() {
  const [selectedImage, setSelectedImage] = useState(null);

  const collaborations = [
    { 
      id: 1, 
      type: 'rectangle', 
      alt: 'Collaboration 1',
      src: '/workwith-1.jpg'
    },
    { 
      id: 2, 
      type: 'rectangle', 
      alt: 'Collaboration 2',
      src: '/workwith-2.jpeg'
    },
    { 
      id: 3, 
      type: 'square', 
      alt: 'Collaboration 3',
      src: '/workwith-3.jpeg'
    },
    { 
      id: 4, 
      type: 'square', 
      alt: 'Collaboration 4',
      src: '/workwith-4.jpeg'
    },
    { 
      id: 5, 
      type: 'square', 
      alt: 'Collaboration 5',
      src: '/workwith-5.jpg'
    },
    { 
      id: 6, 
      type: 'square', 
      alt: 'Collaboration 6',
      src: '/workwith-6.jpg' 
    }
  ];

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const openModal = (collab) => {
    setSelectedImage(collab);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e) => {
    // Close modal only if clicking on the overlay, not the image
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Notable Collaborations
            </h2>
            <p className={styles.subtitle}>
              Bringing stories to life through partnerships with talented artists and visionaries
            </p>
          </div>

          {/* Image Grid */}
          <div className={styles.grid}>
            {collaborations.map((collab) => (
              <div
                key={collab.id}
                className={`${styles.gridItem} ${
                  collab.type === 'rectangle' ? styles.rectangle : styles.square
                }`}
                onClick={() => openModal(collab)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={collab.src}
                    alt={collab.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.overlay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
     <div className={styles.modalOverlay} onClick={handleOverlayClick}>
       <button 
      className={styles.closeButton}
      onClick={closeModal}
      aria-label="Close modal"
    >
      ×
    </button>
  <div className={styles.modalContent}>
   
    <div className={styles.modalImageWrapper}>
      <Image
        src={selectedImage.src}
        alt={selectedImage.alt}
        fill
        sizes="95vw"
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  </div>
</div>
      )}
    </>
  );
}