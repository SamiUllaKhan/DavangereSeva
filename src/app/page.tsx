export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Search, MapPin, ShieldCheck, Zap, Clock, Star, Grid, Database, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import dbConnect from '@/lib/mongodb';
import {
  Wrench,
  Paintbrush,
  Sparkles,
  Wind,
  Plug,
  Bug,
  Truck,
  Monitor
} from 'lucide-react';

const categories = [
  { name: 'Cleaning', icon: Sparkles, slug: 'cleaning', color: 'bg-blue-50' },
  { name: 'Plumbing', icon: Wrench, slug: 'plumbing', color: 'bg-indigo-50' },
  { name: 'Electrician', icon: Plug, slug: 'electrician', color: 'bg-amber-50' },
  { name: 'AC Repair', icon: Wind, slug: 'ac-repair', color: 'bg-cyan-50' },
  { name: 'Painting', icon: Paintbrush, slug: 'painting', color: 'bg-rose-50' },
  { name: 'Pest Control', icon: Bug, slug: 'pest-control', color: 'bg-emerald-50' },
  { name: 'Appliance', icon: Monitor, slug: 'appliance-repair', color: 'bg-purple-50' },
  { name: 'Shifting', icon: Truck, slug: 'packers-movers', color: 'bg-orange-50' },
];

export default async function Home() {
  let isConnected = false;
  try {
    await dbConnect();
    isConnected = true;
  } catch (e) {
    console.error('Database connection failed:', e);
  }

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Database Connection Status (Internal/Dev Only) */}
      <div className="fixed top-4 right-4 z-[100] scale-75 origin-top-right">
        {isConnected ? (
          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse">
            <Database size={14} />
            DB CONNECTED
          </div>
        ) : (
          <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
            <Database size={14} />
            DB DISCONNECTED
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        </div>
        <div className="container px-4 md:px-8 relative z-10 text-center text-white mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight uppercase">
            Your Comfort, Our Responsibility
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Book professional services for your home and office in Davanagere.
          </p>

          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-2 bg-white p-2 rounded-lg shadow-2xl">
            <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r">
              <MapPin className="text-primary" size={20} />
              <Input
                className="border-none focus-visible:ring-0 text-black placeholder:text-gray-400"
                placeholder="Davanagere, Karnataka"
                readOnly
              />
            </div>
            <div className="flex-[2] flex items-center px-4 gap-2">
              <Search className="text-gray-400" size={20} />
              <Input
                className="border-none focus-visible:ring-0 text-black placeholder:text-gray-400"
                placeholder="What service do you need?"
              />
            </div>
            <Button size="lg" className="px-8 font-bold uppercase tracking-wide">Search</Button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container px-4 md:px-8 mx-auto -mt-16 relative z-20">
        <Card className="border-none shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 tracking-tight">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/services/${cat.slug}`} className="group flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                    <cat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modern How it Works */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container px-4 md:px-8 mx-auto relative z-10">
          <div className="max-w-3xl mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-gray-900 leading-[1.1]">
              HOW WE MAKE YOUR <br /> LIFE <span className="text-primary">EASIER</span>
            </h3>
            <p className="text-lg text-gray-500 font-medium max-w-xl">
              From choosing your expert to getting the job done, we've streamlined everything for speed and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Visual Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[2px] bg-gray-100 -z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            {[
              {
                step: '01',
                title: 'SELECT SERVICE',
                desc: 'Explore our curated list of professional home services.',
                icon: Grid,
                gradient: 'from-primary/80 to-primary'
              },
              {
                step: '02',
                title: 'BOOK A SLOT',
                desc: 'Choose a time and date that works best for your schedule.',
                icon: Clock,
                gradient: 'from-primary to-primary/90'
              },
              {
                step: '03',
                title: 'JOB COMPLETED',
                desc: 'Sit back while our verified expert handles the rest securely.',
                icon: Zap,
                gradient: 'from-primary/90 to-primary/70'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-4 md:p-8">
                <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group-hover:-translate-y-4 relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon size={32} />
                    </div>
                    <span className="text-5xl font-black text-gray-100 group-hover:text-primary/10 transition-colors uppercase italic">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-black mb-4 tracking-tighter text-gray-900 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6 italic">"{item.desc}"</p>

                  <div className="h-1 w-12 bg-gray-100 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                </div>

                {/* Mobile Connector */}
                {idx < 2 && (
                  <div className="md:hidden flex justify-center py-4">
                    <div className="h-8 w-[2px] bg-gray-100" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button size="lg" className="rounded-full px-12 h-14 font-black uppercase tracking-widest gap-2 bg-gray-950 hover:bg-primary transition-all shadow-xl hover:shadow-primary/20">
              Ready to start? <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -ml-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Why Choose Davanagere Seva?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified Professionals', desc: 'Every service provider is strictly background-checked.', icon: ShieldCheck },
                  { title: 'Transparent Pricing', desc: 'Know exactly what you pay before you book. No hidden costs.', icon: Sparkles },
                  { title: 'Quality Guarantee', desc: 'We take full responsibility for the quality of work.', icon: Star }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <item.icon className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-10 px-8 py-6 text-lg font-bold uppercase tracking-wide">Book a Service Now</Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-200 rounded-[3rem] rotate-3 absolute inset-0 -z-10 opacity-30"></div>
              <div className="aspect-square bg-primary/10 rounded-[3rem] -rotate-3 absolute inset-0 -z-10"></div>
              <div className="relative aspect-square bg-gray-200 rounded-[3rem] overflow-hidden flex items-center justify-center text-gray-400 italic">
                {/* Visual Placeholder for high quality service image */}
                <div className="text-center group p-8">
                  <Star className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                  <p className="font-semibold text-lg">Premium Service Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
