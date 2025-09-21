// app/video-category/[category]/page.js

import { notFound } from 'next/navigation';
import { getVideosByCategory, categories } from '../../../utils/videoData';
import CategoryPage from '../../../components/CategoryPage/CategoryPage';

export async function generateMetadata({ params }) {
  const categoryFormatted = params.category.replace(/-/g, ' ').toUpperCase();
  
  if (!categories.includes(categoryFormatted) && categoryFormatted !== 'ALL') {
    return {
      title: 'Category Not Found'
    };
  }

  return {
    title: `${categoryFormatted} Videos | Raaj Portfolio`,
    description: `Browse all ${categoryFormatted.toLowerCase()} videos and projects`
  };
}

export default function CategoryPageServer({ params }) {
  const categoryFormatted = params.category.replace(/-/g, ' ').toUpperCase();
  
  if (!categories.includes(categoryFormatted) && categoryFormatted !== 'ALL') {
    notFound();
  }

  const videos = getVideosByCategory(categoryFormatted);

  return (
    <CategoryPage 
      categoryFormatted={categoryFormatted}
      videos={videos}
    />
  );
}