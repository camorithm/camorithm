'use client';

import React from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import { Play, Lock, BookOpen, BarChart } from 'lucide-react';

const COURSES = [
{
  title: "Beginner's Track",
  description: "Start your journey here. Learn the terminology and basics of MT4/MT5.",
  videos: [
    { title: "What is Prop Trading?", duration: "10:24", locked: false },
    { title: "Setting up MetaTrader", duration: "15:30", locked: false },
    { title: "Understanding Pips & Lots", duration: "12:15", locked: false },
  ]
},
{
  title: "Technical Analysis",
  description: "Master price action, support & resistance, and key indicators.",
  videos: [
    { title: "Support & Resistance Masterclass", duration: "25:00", locked: false },
    { title: "Trading Supply & Demand", duration: "30:10", locked: true },
    { title: "Fibonacci Retracements", duration: "18:45", locked: true },
  ]
},
{
  title: "Risk Management",
  description: "The most important module. Learn how to protect your capital.",
  videos: [
    { title: "The 1% Rule", duration: "14:20", locked: true },
    { title: "Calculating Position Size", duration: "22:15", locked: true },
    { title: "Psychology of Loss", duration: "19:00", locked: true },
  ]
}
];

export default function AcademyPage() {
return (
  <div className="min-h-screen bg-[#0a0b0d] text-white">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-16 px-6 border-b border-white/5">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
               <BookOpen className="w-3 h-3" /> Free for all users
            </div>
            <h1 className="text-5xl font-['Space_Grotesk'] font-bold mb-6">Master the Markets.</h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-8">
               A comprehensive curriculum designed to take you from a complete beginner to a funded professional trader.
            </p>
            <button className="px-8 py-4 bg-[#007aff] hover:bg-[#0062cc] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1">
               Start Learning
            </button>
         </div>
         
         {/* Progress Card */}
         <div className="w-full md:w-96 bg-[#13151a] border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold">Your Progress</h3>
               <span className="text-xs text-gray-500 uppercase tracking-wider">0% Complete</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full mb-6">
               <div className="w-0 h-full bg-[#007aff] rounded-full" />
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Play className="w-3 h-3" /></div>
                  <span>0/45 Lessons Completed</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><BarChart className="w-3 h-3" /></div>
                  <span>Beginner Level</span>
               </div>
            </div>
         </div>
      </div>
    </section>

    {/* Courses */}
    <section className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto space-y-16">
         {COURSES.map((category, idx) => (
            <div key={idx}>
               <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="text-gray-400 text-sm">{category.description}</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.videos.map((vid, vIdx) => (
                     <div key={vIdx} className="group relative bg-[#13151a] border border-white/5 rounded-xl overflow-hidden hover:border-[#007aff]/50 transition-all cursor-pointer">
                        {/* Thumbnail Mockup */}
                        <div className="h-40 bg-gradient-to-br from-gray-800 to-black relative flex items-center justify-center">
                           <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                              {vid.locked ? <Lock className="w-5 h-5 text-gray-400" /> : <Play className="w-5 h-5 text-white ml-1" />}
                           </div>
                           <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                              {vid.duration}
                           </div>
                        </div>
                        
                        <div className="p-4">
                           <h4 className="font-bold text-sm mb-1 group-hover:text-[#007aff] transition-colors">{vid.title}</h4>
                           <p className="text-xs text-gray-500">{vid.locked ? 'Login to watch' : 'Free Preview'}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
    </section>

    <Footer />
  </div>
);
}