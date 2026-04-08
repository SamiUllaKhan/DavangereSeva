'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchBar } from '@/components/layout/SearchBar';
import { SpotlightCarousel } from './SpotlightCarousel';

interface HomeClientWrapperProps {
  categories: any[];
  spotlightServices: any[];
  isConnected: boolean;
}

export default function HomeClientWrapper({ categories, spotlightServices, isConnected }: HomeClientWrapperProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-12 pb-12">
      {/* Database Connection Status (Internal/Dev Only) */}
      <div className="fixed top-4 right-4 z-[100] scale-75 origin-top-right">
        {isConnected ? (
          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse">
            <Icons.Database size={14} />
            DB CONNECTED
          </div>
        ) : (
          <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
            <Icons.Database size={14} />
            DB DISCONNECTED
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:h-[700px] flex items-center justify-center overflow-hidden px-4 md:px-0 bg-gray-900 py-12 md:py-0">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gray-900/60 transition-opacity"></div>
          {/* Top gradient to blend with the header if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>
        
        <div className="container px-4 md:px-8 relative z-10 text-center text-white mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-7xl font-black mb-3 tracking-tighter uppercase leading-[0.9]">
              Home services <br /> <span className="text-blue-200">at your doorstep</span>
            </h1>
            <p className="text-sm md:text-xl mb-6 text-blue-100/80 max-w-2xl mx-auto font-medium uppercase tracking-[0.2em]">
              Professional • Reliable • Expert Care in Davanagere
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <SearchBar variant="home" />

            {/* Trending Services */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4 overflow-hidden px-4">
              <span className="text-blue-200/60 text-xs font-bold uppercase tracking-widest self-center mr-2 hidden md:inline">Trending:</span>
              {['AC Repair', 'Cleaning', 'Electrician', 'Plumber'].map((term) => (
                <Link 
                  key={term}
                  href={`/services?q=${encodeURIComponent(term)}`}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest text-white border border-white/10 transition-all hover:scale-105"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid - Brought Higher and cleaner */}
      <section className="container px-4 md:px-8 mx-auto mt-4 md:mt-8 lg:-mt-24 relative z-20 pb-4 md:pb-8">
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardContent className="p-3 md:p-8">
            <div className="flex flex-col items-center text-center mb-6 gap-0.5">
              <h2 className="text-lg md:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                What can we help you with?
              </h2>
              <Button asChild variant="ghost" className="rounded-full font-black uppercase tracking-widest text-[10px] text-primary hover:bg-primary/5 px-6">
                <Link href="/services" className="flex items-center gap-2">
                  View All Services <Icons.ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
              {categories.slice(0, 8).map((cat: any) => {
                const IconComponent = (Icons as any)[cat.icon] || Icons.HelpCircle;
                return (
                  <Link key={cat.slug} href={`/services/${cat.slug}`} className="group flex flex-col items-center gap-4 relative">
                    {cat.status === 'coming-soon' && (
		                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-sm uppercase tracking-tighter">Soon</span>
                    )}
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[22px] md:rounded-[28px] bg-gray-50 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 ring-1 ring-gray-100 group-hover:ring-primary/20`}>
                      <IconComponent className="w-7 h-7 md:w-10 md:h-10 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                    <span className="text-[11px] md:text-xs font-black text-gray-600 text-center group-hover:text-primary transition-colors uppercase tracking-widest leading-tight px-1">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Trust Stats Section (New) */}
      <section className="container px-4 md:px-8 mx-auto mt-2 md:mt-4 lg:-mt-6 py-4 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 text-center px-4 md:px-8 py-4 md:py-10 bg-gray-900 rounded-[24px] md:rounded-[40px] text-white shadow-2xl">
          {[
            { val: "500+", label: "Verified Experts", sub: "Skilled professionals" },
            { val: "10k+", label: "Happy Homes", sub: "Services delivered" },
            { val: "4.8★", label: "Average Rating", sub: "User satisfaction" },
            { val: "24/7", label: "Local Support", sub: "Always here to help" }
          ].map((stat, idx) => (
            <div key={idx} className="relative group">
              <div className="text-2xl md:text-5xl font-black mb-0.5 group-hover:scale-110 transition-transform duration-500">{stat.val}</div>
              <div className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-200 mb-0.5">{stat.label}</div>
              <div className="text-[7px] md:text-[9px] font-medium text-gray-400/80 uppercase tracking-widest">{stat.sub}</div>
              {idx < 3 && <div className="hidden md:absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />}
            </div>
          ))}
        </div>
      </section>
 
      {/* Spotlight Slider (New) */}
      <div className="relative z-30">
        <SpotlightCarousel services={spotlightServices} />
      </div>

      {/* Modern How it Works */}
      <section className="py-8 md:py-20 relative overflow-hidden bg-white">
        <div className="container px-4 md:px-8 mx-auto relative z-10">
          <div className="max-w-3xl mb-6 md:mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1 md:mb-4 italic">Step-by-step Guide</h2>
            <h3 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 md:mb-6 text-gray-900 leading-[1.1]">
              HOW IT <span className="text-primary italic underline decoration-blue-200 underline-offset-8">WORKS</span>
            </h3>
            <p className="text-sm md:text-lg text-gray-500 font-medium max-w-xl">
              Davanagere Seva simplifies your home maintenance. Just follow these 3 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 relative">
            {/* Visual Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[2px] bg-gray-100 -z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            {[
              {
                step: '01',
                title: 'SELECT SERVICE',
                desc: 'Explore our curated list of professional home services.',
                icon: Icons.Grid,
                gradient: 'from-primary/80 to-primary'
              },
              {
                step: '02',
                title: 'BOOK A SLOT',
                desc: 'Choose a time and date that works best for your schedule.',
                icon: Icons.Clock,
                gradient: 'from-primary to-primary/90'
              },
              {
                step: '03',
                title: 'JOB COMPLETED',
                desc: 'Sit back while our verified expert handles the rest securely.',
                icon: Icons.Zap,
                gradient: 'from-primary/90 to-primary/70'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-0 md:p-4">
                <div className="bg-white rounded-[24px] md:rounded-[40px] p-4 md:p-10 border border-gray-100 md:border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 md:group-hover:-translate-y-4 relative z-10">
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 mb-0 md:mb-8`}>
                      <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center md:block">
                        <h4 className="text-sm md:text-xl font-black md:mb-4 tracking-tight text-gray-900 group-hover:text-primary transition-colors uppercase">
                          {item.title}
                        </h4>
                        <span className="text-2xl md:text-5xl font-black text-gray-100 group-hover:text-primary/10 transition-colors uppercase italic md:absolute md:top-8 md:right-10 leading-none">
                          {item.step}
                        </span>
                      </div>
                      <p className="text-gray-500 font-medium leading-relaxed italic text-xs md:text-base mb-2 md:mb-6">
                        "{item.desc}"
                      </p>
                      <div className="h-0.5 md:h-1 w-8 md:w-12 bg-gray-100 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                    </div>
                  </div>
                </div>

                {/* Mobile Connector */}
                {idx < 2 && (
                  <div className="md:hidden flex justify-center py-1">
                    <div className="h-4 w-[1px] bg-gray-100" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-12 text-center">
            <Link href="/services">
              <Button size="lg" className="rounded-full px-8 md:px-12 h-11 md:h-14 text-[10px] md:text-sm font-black uppercase tracking-widest gap-2 bg-gray-950 hover:bg-primary transition-all shadow-xl hover:shadow-primary/20">
                Ready to start? <Icons.ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -ml-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Promise Section */}
      <section className="bg-white py-6 md:py-16 border-t border-gray-50">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-stretch">
            <div className="relative h-full">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl hidden md:block" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl hidden md:block" />
              
              <div 
                className="relative h-full w-full min-h-[300px] lg:min-h-full rounded-[30px] md:rounded-[60px] overflow-hidden border border-gray-100 group shadow-2xl"
                style={{
                  backgroundImage: "url('/images/promise-bg.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gray-900/60 transition-opacity duration-700 group-hover:bg-gray-900/70" />
                <div className="flex flex-col items-center justify-center h-full w-full p-8 md:p-12 text-center relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-[30px] md:rounded-[40px] bg-white/10 backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center mb-6 md:mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700">
                    <Icons.ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4 tracking-tighter text-white leading-none shadow-sm capitalize md:uppercase">THE DAVANAGERE SEVA <br /> <span className="text-blue-300 italic">PROMISE</span></h3>
                  <p className="text-gray-200 font-medium max-w-xs mx-auto italic text-sm md:text-base">"We don't just provide services, we provide peace of mind."</p>
                </div>
              </div>

              {/* Float Rating Badge */}
              <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-white p-3 md:p-6 rounded-2xl md:rounded-[32px] shadow-2xl border border-gray-50 flex items-center gap-2 md:gap-4 animate-bounce-slow">
                <div className="bg-amber-400 p-1.5 md:p-3 rounded-xl md:rounded-2xl text-white">
                  <Icons.Star className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-black text-gray-900 leading-none">4.8</p>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">User Rating</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-12">
              <div className="max-w-md text-center lg:text-left mx-auto lg:mx-0">
                <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-primary mb-2 md:mb-4">Why we are different</h2>
                <h3 className="text-xl md:text-5xl font-black tracking-tighter mb-2 md:mb-6 text-gray-900 leading-none uppercase">
                  Service you can <br /> <span className="text-primary underline decoration-blue-100 underline-offset-8">depend on.</span>
                </h3>
              </div>
              
              <div className="grid gap-4 md:gap-8">
                {[
                  { title: 'Verified Professionals', desc: 'Every service provider is background-checked and expert-vetted.', icon: Icons.UserCheck, color: 'bg-emerald-50 text-emerald-600' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs. Pay only what was agreed upfront.', icon: Icons.CreditCard, color: 'bg-blue-50 text-blue-600' },
                  { title: 'Customer Satisfaction', desc: 'We take full responsibility for the quality of work delivered.', icon: Icons.Heart, color: 'bg-rose-50 text-rose-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 md:gap-6 group">
                    <div className={`mt-1 w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl ${item.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-sm md:text-xl mb-0.5 md:mb-1 tracking-tight text-gray-900 group-hover:text-primary transition-colors uppercase">{item.title}</h4>
                      <p className="text-gray-500 font-medium text-[10px] md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 md:pt-8 text-center lg:text-left">
                <Button size="lg" className="rounded-full px-8 md:px-12 h-12 md:h-16 text-[10px] md:text-sm font-black uppercase tracking-widest gap-2 bg-gray-900 hover:bg-primary transition-all shadow-2xl hover:shadow-primary/20">
                  Join our community <Icons.ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
