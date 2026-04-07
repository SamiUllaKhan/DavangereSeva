import dbConnect from '@/lib/mongodb';
import { getCategories, getSpotlightServices } from '@/app/actions/admin';
import HomeClientWrapper from '@/components/home/HomeClientWrapper';

export default async function Home() {
  const categories = await getCategories();
  const spotlightServices = await getSpotlightServices();
  let isConnected = false;
  try {
    await dbConnect();
    isConnected = true;
  } catch (e) {
    console.error('Database connection failed:', e);
  }

  return <HomeClientWrapper categories={categories} spotlightServices={spotlightServices} isConnected={isConnected} />;
}
