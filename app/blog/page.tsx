'use client';

import React from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import { Calendar, Clock, ArrowUpRight, Tag } from 'lucide-react';

const POSTS = [
{
  id: 1,
  title: "Understanding Psychology in Prop Trading",
  excerpt: "Why 90% of traders fail not because of strategy, but because of mindset. Learn how to control your emotions.",
  date: "Dec 12, 2024",
  readTime: "5 min read",
  category: "Psychology",
  image: "bg-gradient-to-br from-purple-900 to-blue-900"
},
{
  id: 2,
  title: "Market Analysis: Gold Hits All Time Highs",
  excerpt: "A deep dive into the macro-economic factors driving XAUUSD to new levels.",
  date: "Dec 10, 2024",
  readTime: "3 min read",
  category: "Analysis",
  image: "bg-gradient-to-br from-yellow-900 to-orange-900"
},
{
  id: 3,
  title: "How to Calculate Risk per Trade Correctly",
  excerpt: "Stop blowing accounts. Use our simple formula to never risk more than 1% per trade.",
  date: "Dec 08, 2024",
  readTime: "7 min read",
  category: "Education",
  image: "bg-gradient-to-br from-green-900 to-emerald-900"
},
{
  id: 4,
  title: "The Impact of CPI Data on EURUSD",
  excerpt: "How to trade high-impact news events without getting slippage.",
  date: "Dec 05, 2024",
  readTime: "4 min read",
  category: "Analysis",
  image: "bg-gradient-to-br from-gray-800 to-gray-900"
}
];

export default function BlogPage() {
const featured = POSTS[0];
const gridPosts = POSTS.slice(1);

return (
  <div className="min-h-screen bg-[#0a0b0d] text-white">
    <Navbar />

    <section className="pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
           <h1 className="text-5xl font-['Space_Grotesk'] font-bold mb-4">Latest Insights</h1>
           <p className="text-gray-400">Market analysis, trading tips, and company updates.</p>
        </div>

        {/* Featured Post */}
        <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#13151a] mb-16 grid grid-cols-1 lg:grid-cols-2">
           <div className={`h-64 lg:h-auto ${featured.image} relative`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
           </div>
           <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#007aff] text-sm font-bold uppercase tracking-wider mb-4">
                 <Tag className="w-4 h-4" /> {featured.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-[#007aff] transition-colors">{featured.title}</h2>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">{featured.excerpt}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-white/5 pt-6 mt-auto">
                 <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featured.date}</div>
                 <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featured.readTime}</div>
              </div>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {gridPosts.map(post => (
              <div key={post.id} className="group bg-[#13151a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
                 <div className={`h-48 ${post.image} relative`}>
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                       {post.category}
                    </div>
                 </div>
                 <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#007aff] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                       <span>{post.date}</span>
                       <span className="flex items-center gap-1 group-hover:text-white transition-colors">Read Article <ArrowUpRight className="w-3 h-3" /></span>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
}