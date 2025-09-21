// app/video/[slug]/page.js

import { notFound } from 'next/navigation';
import { getVideoBySlug } from '../../../utils/videoData';
import VideoPage from '../../../components/VideoPage/VideoPage';

export async function generateMetadata({ params }) {
  const video = getVideoBySlug(params.slug);
  
  if (!video) {
    return {
      title: 'Video Not Found'
    };
  }

  return {
    title: `${video.title} | Raaj Portfolio`,
    description: `Watch ${video.title} - ${video.categories.join(', ')}`
  };
}

export default function VideoPageServer({ params }) {
  const video = getVideoBySlug(params.slug);

  if (!video) {
    notFound();
  }

  return <VideoPage video={video} />;
}