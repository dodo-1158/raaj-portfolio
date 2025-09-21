// components/VideoOverlay/VideoOverlay.js
'use client';

import { useEffect } from 'react';
import styles from './VideoOverlay.module.css';

const VideoOverlay = ({ videoId, title, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <span>✕</span>
        </button>
        <div className={styles.videoContainer}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;