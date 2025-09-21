// // components/Work/Work.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import VideoOverlay from '../VideoOverlay/VideoOverlay';
// import { categories, videos } from '../../utils/videoData';
// import styles from './work.module.css';

// const Work = () => {
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [filteredVideos, setFilteredVideos] = useState(videos);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     filterVideos(activeCategory);
//   }, [activeCategory]);

//   const filterVideos = (category) => {
//     setIsAnimating(true);
    
//     setTimeout(() => {
//       if (category === 'ALL') {
//         setFilteredVideos(videos);
//       } else {
//         const filtered = videos.filter(video =>
//           video.categories.includes(category)
//         );
//         setFilteredVideos(filtered);
//       }
//       setIsAnimating(false);
//     }, 300);
//   };

//   const handleCategoryClick = (category) => {
//     if (category !== activeCategory) {
//       setActiveCategory(category);
//     }
//   };

//   const handleVideoPlay = (video) => {
//     setSelectedVideo(video);
//   };

//   const handleCloseOverlay = () => {
//     setSelectedVideo(null);
//   };

//   const getCategorySlug = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-');
//   };

//   return (
//     <section className={styles.workSection}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2 className={styles.title}>My Works</h2>
//           <p className={styles.subtitle}>WE WILL TO DEVELOP YOUR FILM, YOUR TALENT</p>
//         </div>

//         <div className={styles.filterContainer}>
//           {categories.map((category) => (
//             <button
//               key={category}
//               className={`${styles.filterButton} ${
//                 activeCategory === category ? styles.active : ''
//               }`}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <div className={`${styles.videoGrid} ${isAnimating ? styles.animating : ''}`}>
//           {filteredVideos.map((video, index) => (
//             <div
//               key={video.id}
//               className={styles.videoCard}
//               style={{
//                 animationDelay: `${index * 0.1}s`
//               }}
//             >
//               <div className={styles.thumbnailContainer}>
//                 <div
//                   className={styles.thumbnail}
//                   style={{
//                     backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg)`
//                   }}
//                 >
//                   <div className={styles.overlay}>
//                     <button
//                       className={styles.playButton}
//                       onClick={() => handleVideoPlay(video)}
//                       aria-label={`Play ${video.title}`}
//                     >
//                       <svg
//                         width="60"
//                         height="60"
//                         viewBox="0 0 60 60"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
//                         <path
//                           d="M25 20L40 30L25 40V20Z"
//                           fill="#FF6B35"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.cardContent}>
//                 <Link href={`/video/${video.slug}`} className={styles.titleLink}>
//                   <h3 className={styles.videoTitle}>{video.title}</h3>
//                 </Link>
//                 <div className={styles.tags}>
//                   {video.categories.map((tag) => (
//                     <Link
//                       key={tag}
//                       href={`/video-category/${getCategorySlug(tag)}`}
//                       className={styles.tag}
//                     >
//                       {tag}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedVideo && (
//         <VideoOverlay
//           videoId={selectedVideo.videoId}
//           title={selectedVideo.title}
//           onClose={handleCloseOverlay}
//         />
//       )}
//     </section>
//   );
// };

// export default Work;

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoOverlay from '../VideoOverlay/VideoOverlay';
import { categories, videos } from '../../utils/videoData';
import styles from './work.module.css';

const CARDS_PER_ROW = 4;
const INITIAL_ROWS = 3; // You can set this to 3 or 4 as per requirement

const Work = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(INITIAL_ROWS);

  useEffect(() => {
    filterVideos(activeCategory);
    setRowsVisible(INITIAL_ROWS); // Reset on filter change
  }, [activeCategory]);

  const filterVideos = (category) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (category === 'ALL') {
        setFilteredVideos(videos);
      } else {
        const filtered = videos.filter(video =>
          video.categories.includes(category)
        );
        setFilteredVideos(filtered);
      }
      setIsAnimating(false);
    }, 200);
  };

  const handleCategoryClick = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  const handleVideoPlay = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseOverlay = () => {
    setSelectedVideo(null);
  };

  const handleViewMore = () => {
    setRowsVisible(rowsVisible + 3); // Show 2 more rows per click (adjust as needed)
  };

  const getCategorySlug = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  // Calculate how many cards to show based on rowsVisible
  const maxCardsToShow = activeCategory === 'ALL'
    ? rowsVisible * CARDS_PER_ROW
    : filteredVideos.length;

  const videosToShow = filteredVideos.slice(0, maxCardsToShow);

  const canViewMore =
    activeCategory === 'ALL' && maxCardsToShow < filteredVideos.length;

  return (
    <section className={styles.workSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Works</h2>
          <p className={styles.subtitle}>WE WILL TO DEVELOP YOUR FILM, YOUR TALENT</p>
        </div>

        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={`${styles.videoGrid} ${isAnimating ? styles.animating : ''}`}>
          {videosToShow.map((video, index) => (
            <div
              key={video.id}
              className={styles.videoCard}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={styles.thumbnailContainer}>
                <div
                  className={styles.thumbnail}
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg)`
                  }}
                >
                  <div className={styles.overlay}>
                    <button
                      className={styles.playButton}
                      onClick={() => handleVideoPlay(video)}
                      aria-label={`Play ${video.title}`}
                    >
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                        <path
                          d="M25 20L40 30L25 40V20Z"
                          fill="#FF6B35"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <Link href={`/video/${video.slug}`} className={styles.titleLink}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                </Link>
                <div className={styles.tags}>
                  {video.categories.map((tag) => (
                    <Link
                      key={tag}
                      href={`/video-category/${getCategorySlug(tag)}`}
                      className={styles.tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View More Button */}
        {canViewMore && (
          <div style={{textAlign: 'center', margin: '40px 0'}}>
            <button className={styles.filterButton} onClick={handleViewMore}>
              View More
            </button>
          </div>
        )}
      </div>

      {selectedVideo && (
        <VideoOverlay
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          onClose={handleCloseOverlay}
        />
      )}
    </section>
  );
};

export default Work;
