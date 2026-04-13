import dbConnect from '@/lib/mongodb';
import { getCategories, getSpotlightServices } from '@/app/actions/admin';
import HomeClientWrapper from '@/components/home/HomeClientWrapper';
import { Suspense } from 'react';

async function HomeContent() {
  const [categories, spotlightServices] = await Promise.all([
    getCategories(),
    getSpotlightServices()
  ]);
  
  return <HomeClientWrapper categories={categories} spotlightServices={spotlightServices} isConnected={true} />;
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
