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
      </div>
    </section>
  );
};

export default Awards;