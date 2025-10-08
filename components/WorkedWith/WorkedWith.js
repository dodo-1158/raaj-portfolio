import Image from 'next/image';
import styles from './workedwith.module.css';

export default function WorkedWith() {
  const collaborations = [
    { 
      id: 1, 
      type: 'rectangle', 
      alt: 'Collaboration 1',
      src: '/workwith-1.jpg' // Update with your image path
    },
    { 
      id: 2, 
      type: 'rectangle', 
      alt: 'Collaboration 2',
      src: '/workwith-2.jpeg' // Update with your image path
    },
    { 
      id: 3, 
      type: 'square', 
      alt: 'Collaboration 3',
      src: '/workwith-3.jpeg' // Update with your image path
    },
    { 
      id: 4, 
      type: 'square', 
      alt: 'Collaboration 4',
      src: '/workwith-4.jpeg' // Update with your image path
    }
  ];

  return (
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
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={collab.src}
                  alt={collab.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
               
                />
              </div>
              <div className={styles.overlay} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// import Image from 'next/image';
// import styles from './workedwith.module.css';

// export default function WorkedWith() {
//   const collaborations = [
//     { 
//       id: 1, 
//       type: 'square', 
//       alt: 'Collaboration 1',
//       src: '/workwith-3.jpeg' // Moved square image here
//     },
//     { 
//       id: 2, 
//       type: 'rectangle', 
//       alt: 'Collaboration 2',
//       src: '/workwith-1.jpg' // Rectangle image
//     },
//     { 
//       id: 3, 
//       type: 'rectangle', 
//       alt: 'Collaboration 3',
//       src: '/workwith-2.jpeg' // Rectangle image
//     },
//     { 
//       id: 4, 
//       type: 'square', 
//       alt: 'Collaboration 4',
//       src: '/workwith-4.jpeg' // Square image
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
                  
//                   style={{ objectFit: 'cover' }}
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