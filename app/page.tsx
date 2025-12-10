import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
ArrowRight, Github, Linkedin, Twitter, Instagram, 
Brain, TrendingUp, Code2, BookOpen, Rocket, 
Globe, Mail, ChevronRight, Terminal, BarChart3, 
Cpu, GraduationCap, Video, Activity, Zap, Layers,
PieChart, ShieldCheck, DollarSign, ArrowUpRight
} from 'lucide-react';

export const metadata: Metadata = {
title: 'Cameron Batt | GTM Consultant & AI Researcher',
description: 'Cameron Batt (@camorithm) is a GTM Consultant and ML Researcher helping tech founders scale. Founder of Logisum and AppCapy.',
keywords: ['GTM consultant', 'Go-to-market strategy', 'AI researcher', 'Machine Learning', 'Startup Growth', 'Logisum', 'Camorithm'],
openGraph: {
  title: 'Cameron Batt | GTM Consultant',
  description: 'Building the future with algorithms. From ML research to scalable GTM strategies.',
  url: 'https://camorithm.com',
  siteName: 'Cameron Batt',
  locale: 'en_US',
  type: 'website',
},
};

export default function PortfolioPage() {
return (
  <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
    
    {/* NAVIGATION */}
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-mono font-bold text-xl tracking-tighter text-white">
          <span className="text-indigo-500">~/</span>camorithm
        </div>
        <div className="flex items-center gap-6">
          <a href="#impact" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">Impact</a>
          <a href="#work" className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">Work</a>
          <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer" className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
            Book 15-Min
          </a>
        </div>
      </div>
    </nav>

    {/* HERO SECTION */}
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold px-3 py-1 mb-8 rounded-full font-mono">
            <Terminal size={12} />
            HELLO_WORLD
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight">
            The leading <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Go-to-Market Consultant.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
            I am a <span className="text-white font-medium">GTM Consultant</span> and AI Researcher. 
            I bridge the gap between complex ML algorithms and revenue-generating business models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://logisum.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/25 group">
              Visit Logisum <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">
              My Philosophy
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* NEW SECTION: THE IMPACT MATRIX (Bento Grid) */}
    <section id="impact" className="py-24 border-t border-white/5 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="text-indigo-500 font-mono text-xs font-bold mb-2">PERFORMANCE_METRICS</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Impact by the Numbers</h2>
          </div>
          <div className="text-right hidden md:block">
             <div className="text-sm text-slate-400 font-mono">CUMULATIVE DATA</div>
             <div className="text-xs text-green-500 font-mono flex items-center justify-end gap-1">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> SYSTEM_OPTIMAL
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Stat */}
          <div className="md:col-span-2 bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <BarChart3 size={100} className="text-indigo-500" />
            </div>
            <div className="relative z-10">
               <div className="text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">£12M+</div>
               <div className="text-indigo-400 font-bold uppercase tracking-wider mb-4">Revenue Generated</div>
               <p className="text-slate-400 max-w-md">
                 Across 15+ client engagements, implementing data-driven GTM strategies and ML-powered ad optimization.
               </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl group hover:bg-slate-900 hover:border-white/20 transition-all">
             <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-green-500/10 rounded-lg text-green-400"><TrendingUp size={24} /></div>
               <span className="text-xs font-mono text-slate-500">AVG_LIFT</span>
             </div>
             <div className="text-4xl font-bold text-white mb-1">320%</div>
             <div className="text-sm text-slate-400">ROI on Ad Spend</div>
          </div>

          {/* Stat 3 */}
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl group hover:bg-slate-900 hover:border-white/20 transition-all">
             <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><Rocket size={24} /></div>
               <span className="text-xs font-mono text-slate-500">SCALE_EVENT</span>
             </div>
             <div className="text-4xl font-bold text-white mb-1">4</div>
             <div className="text-sm text-slate-400">Client Exits</div>
          </div>

          {/* Stat 4 - Wide */}
          <div className="md:col-span-2 bg-slate-900/50 border border-white/10 p-8 rounded-2xl relative group hover:bg-slate-900 hover:border-white/20 transition-all">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                 <div className="text-3xl font-bold text-white mb-2">90 Days</div>
                 <div className="text-sm text-slate-400">Average time to 2x pipeline velocity</div>
               </div>
               <div className="h-16 w-px bg-white/10 hidden md:block"></div>
               <div>
                 <div className="text-3xl font-bold text-white mb-2">50+</div>
                 <div className="text-sm text-slate-400">ML Models Deployed</div>
               </div>
               <div className="h-16 w-px bg-white/10 hidden md:block"></div>
               <div>
                 <div className="text-3xl font-bold text-white mb-2">Global</div>
                 <div className="text-sm text-slate-400">Client Base (US, UK, EMEA)</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* NEW SECTION: CASE STUDIES (Terminal Style) */}
    <section className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="text-indigo-500 font-mono text-xs font-bold mb-2">MISSION_LOGS</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Declassified Results</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {[
             {
               title: "Fintech Scale-Up",
               tag: "SERIES A",
               metric: "+210%",
               metricLabel: "Lead Quality",
               desc: "Restructured the entire data pipeline to qualify leads before they hit the CRM. Reduced CAC by 40% while doubling volume.",
               tech: ["Python", "HubSpot", "Predictive Lead Scoring"]
             },
             {
               title: "Ad-Tech Optimization",
               tag: "SAAS",
               metric: "£4.2M",
               metricLabel: "New Revenue",
               desc: "Deployed custom ML algorithms to bid on ad inventory in real-time. Outperformed human media buyers by a factor of 3x.",
               tech: ["TensorFlow", "Real-Time Bidding", "BigQuery"]
             },
             {
               title: "E-Commerce Logistics",
               tag: "EXITED",
               metric: "6 Months",
               metricLabel: "To Acquisition",
               desc: "Optimized inventory forecasting using historical data. Cleaned up the balance sheet and prepared the data room for a successful exit.",
               tech: ["Supply Chain Modeling", "Data Analysis", "M&A Prep"]
             }
           ].map((study, i) => (
             <div key={i} className="bg-[#0A0A0A] border border-white/10 p-1 rounded-2xl hover:border-indigo-500/50 transition-colors group">
               <div className="bg-[#050505] rounded-xl p-8 h-full flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                   <div className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-indigo-400 border border-white/5">
                     {study.tag}
                   </div>
                   <ArrowUpRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                 </div>
                 
                 <h3 className="text-xl font-bold text-white mb-4">{study.title}</h3>
                 
                 <div className="mb-6 pb-6 border-b border-white/5">
                   <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-1">{study.metric}</div>
                   <div className="text-xs font-mono text-slate-500">{study.metricLabel}</div>
                 </div>

                 <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                   {study.desc}
                 </p>

                 <div className="flex flex-wrap gap-2 mt-auto">
                   {study.tech.map((t, j) => (
                     <span key={j} className="text-[10px] text-slate-500 font-mono px-2 py-1 bg-white/5 rounded">
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>

    {/* THE HYBRID EDGE (WHY ME?) */}
    <section id="about" className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The Algorithmic <br />
              <span className="text-indigo-400">Approach to GTM</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Most Go-To-Market strategies are based on gut feeling. Mine are based on 
                <span className="text-white"> production-grade data science</span>.
              </p>
              <p>
                With a background in <span className="text-white">Finance (BSc)</span> and years of <span className="text-white">ML Research</span>, 
                I don't just market products; I engineer systems that scale businesses from concept to exit.
              </p>
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl mt-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-indigo-400"><Brain size={24} /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Fun Fact</h4>
                    <p className="text-sm">I've taught AI to spend advertising budgets more efficiently than humans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { icon: Cpu, title: 'ML Researcher', desc: 'Published author in user behavior prediction & ad-tech.' },
              { icon: TrendingUp, title: 'GTM Consultant', desc: 'Scaling founders from zero to revenue using data.' },
              { icon: Code2, title: 'System Architect', desc: 'Building production systems that handle scale.' },
              { icon: BarChart3, title: 'Finance Background', desc: 'BSc Finance. ROI-focused decision making.' },
            ].map((item, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 border border-white/5 p-6 rounded-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CURRENT WORK / PROJECTS */}
    <section id="work" className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="text-indigo-500 font-mono text-xs font-bold mb-2">CURRENT_FOCUS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ventures & Research</h2>
          </div>
          <a href="https://scholar.google.com" target="_blank" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            View Google Scholar <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Logisum Card */}
          <a href="https://logisum.com" target="_blank" className="group relative bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-white/10 rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-between p-8 hover:border-indigo-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                  <Rocket size={20} />
                </div>
                <span className="font-mono text-indigo-300 text-sm">FOUNDER</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Logisum</h3>
              <p className="text-slate-400 text-lg">My primary venture. A next-generation platform scaling businesses through algorithmic GTM strategies.</p>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-white font-bold mt-8 group-hover:translate-x-2 transition-transform">
              Visit Logisum.com <ArrowRight size={16} />
            </div>
          </a>

          {/* AppCapy / Research Card */}
          <div className="grid gap-8">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 hover:bg-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Previous Venture</div>
                  <h3 className="text-2xl font-bold text-white">Founder @ AppCapy</h3>
                </div>
                <Code2 className="text-slate-600" />
              </div>
              <p className="text-slate-400 mb-6">
                Built ML-powered advertising technology. Developed algorithms that optimized millions in ad spend and created production systems that scale.
              </p>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 hover:bg-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Academic</div>
                  <h3 className="text-2xl font-bold text-white">Published Researcher</h3>
                </div>
                <GraduationCap className="text-slate-600" />
              </div>
              <p className="text-slate-400 mb-6">
                Focusing on practical applications of machine learning in ad-tech and user behavior prediction.
              </p>
              <a href="https://scholar.google.com" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-400 transition-colors">
                Read on Google Scholar <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CONNECT / SOCIALS */}
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's build <br />
              the future.
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-md">
              "Every product starts as an idea, but not every idea becomes a product. I help ideas find form."
            </p>
            
            <div className="flex flex-col gap-4">
              <a href="https://calendly.com/your-link" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors w-fit">
                Book a 15-Min Call <ArrowRight size={16} />
              </a>
              <div className="text-sm text-slate-500 font-mono mt-2">
                <span className="text-indigo-500">const</span> status = <span className="text-green-500">"Accepting New Clients"</span>;
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Linkedin, label: 'LinkedIn', handle: '/in/camorithm', url: 'https://linkedin.com/in/camorithm' },
              { icon: Twitter, label: 'Twitter / X', handle: '@camorithm', url: 'https://twitter.com/camorithm' },
              { icon: Instagram, label: 'Instagram', handle: '@camorithm', url: 'https://instagram.com/camorithm' },
              { icon: Video, label: 'TikTok', handle: '@camorithm', url: 'https://tiktok.com/@camorithm' },
              { icon: BookOpen, label: 'ResearchGate', handle: 'Cameron-Batt', url: 'https://researchgate.net' },
              { icon: Github, label: 'GitHub', handle: '@camorithm', url: 'https://github.com/camorithm' },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-indigo-400 group-hover:text-white transition-colors">
                  <social.icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">{social.label}</div>
                  <div className="text-slate-300 font-mono text-sm">{social.handle}</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="py-8 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Cameron Batt. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
           <Link href="https://logisum.com" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">
             Logisum.com
           </Link>
           <span className="text-slate-800">|</span>
           <span className="text-slate-600 text-sm font-mono">BSc Finance • University of Westminster</span>
        </div>
      </div>
    </footer>

    {/* CSS for animations */}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `}} />
  </div>
);
}