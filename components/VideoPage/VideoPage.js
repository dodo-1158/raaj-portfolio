// components/VideoPage/VideoPage.js
'use client';

import Link from 'next/link';
import styles from './VideoPage.module.css';

const VideoPage = ({ video }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {video.title}
          </h1>
          
          <div className={styles.categories}>
            {video.categories.map((category) => (
              <span key={category} className={styles.category}>
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.videoContainer}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.backButton}>
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;