// components/CategoryPage/CategoryPage.js
'use client';

import Link from 'next/link';
import styles from './CategoryPage.module.css';

const CategoryPage = ({ categoryFormatted, videos }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {categoryFormatted} Projects
          </h1>
          
          <p className={styles.subtitle}>
            Showing {videos.length} project{videos.length !== 1 ? 's' : ''}
          </p>

          <Link href="/" className={styles.backButton}>
            ← Back to All Projects
          </Link>
        </div>

        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
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
                />
              </div>

              <div className={styles.cardContent}>
                <Link href={`/video/${video.slug}`} className={styles.titleLink}>
                  <h3 className={styles.videoTitle}>
                    {video.title}
                  </h3>
                </Link>
                
                <div className={styles.tags}>
                  {video.categories.map((tag) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${
                        tag === categoryFormatted ? styles.activeTag : ''
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>
              No projects found in this category
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;