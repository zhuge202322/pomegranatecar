'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import productsData from './products_data.json';

// 提取所有不重复的分类名称，并为每个分类寻找一张代表图片
const categories = Array.from(new Set(productsData.map((p: any) => p.Category)));
const categoryCards = categories.map(cat => {
  const product = productsData.find((p: any) => p.Category === cat && p.Thumbnail);
  return {
    name: cat as string,
    image: product ? product.Thumbnail : 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop', // 默认海滩图兜底
  };
});

// 服务支持区数据
const servicesData = [
  {
    title: "Regarding Product Development",
    desc: "NIUDIAN Automobile adheres to independent research and development, continuously exploring the frontiers of intelligent electric mobility and crafting highly competitive product matrices.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Regarding Production Manufacturing",
    desc: "We adopt a high-end positioning strategy, introducing advanced automated assembly lines and robotic welding to ensure world-class manufacturing precision.",
    img: "/img/service-support-2-1.webp",
    icon: (
      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Regarding Vehicle Delivery",
    desc: "A globally integrated logistics and delivery system guarantees that your vehicles arrive safely, punctually, and ready for deployment.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    )
  },
  {
    title: "Regarding vehicle after-sales",
    desc: "Comprehensive 24/7 after-sales support with a dedicated parts network to ensure that every vehicle operates at peak performance.",
    img: "/img/service-support-1-1.webp",
    icon: (
      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// 产品场景区数据
const scenariosData = [
  {
    id: "01",
    title: "NIUDIAN pickup truck, taking you beyond your dreams",
    bgImg: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "02",
    title: "Resort mobility, elegant and comfortable experiences",
    bgImg: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: "03",
    title: "Urban logistics, efficient and eco-friendly delivery",
    bgImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function Home() {
  const [currentId, setCurrentId] = useState('home');
  const [activeService, setActiveService] = useState(0);
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const isTransitioning = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeCategory === 'All' 
    ? productsData 
    : productsData.filter((p: any) => p.Category === activeCategory);

  // 初始化阻尼滚动 (Lenis 动态绑定到当前页面)
  useEffect(() => {
    let rafId: number;
    const pageNode = document.querySelector(`#${currentId} > .page`);
    const contentNode = document.querySelector(`#${currentId} .scroll-content`);
    
    if (pageNode && contentNode) {
      pageNode.scrollTop = 0; // 切换页面时强制回到顶部
      
      lenisRef.current = new Lenis({
        wrapper: pageNode as HTMLElement,
        content: contentNode as HTMLElement,
        eventsTarget: window,
        lerp: 0.08,
        wheelMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [currentId]);

  // 处理产品详情页的富文本图片懒加载修复
  useEffect(() => {
    if (currentId === 'product-detail' && detailContentRef.current) {
      const images = detailContentRef.current.querySelectorAll('img');
      images.forEach(img => {
        const realSrc = img.getAttribute('data-src') || img.getAttribute('data-webp');
        if (realSrc) {
          img.src = realSrc;
          img.removeAttribute('data-src');
          img.removeAttribute('data-webp');
          img.classList.remove('lazyload');
        }
      });
    }
  }, [currentId, selectedProduct]);

  const transitionTo = (targetId: string) => {
    if (targetId === currentId || isTransitioning.current) return;
    isTransitioning.current = true;

    const outPage = document.getElementById(currentId);
    const inPage = document.getElementById(targetId);

    setCurrentId(targetId);

    // 1. 2D 极简入场位置
    gsap.set(inPage, {
      display: 'block',
      x: '50vw',
      opacity: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outPage, { display: 'none' });
        isTransitioning.current = false;
      }
    });

    // 2. 出场页面简单左移淡出
    tl.to(outPage, {
      x: '-20vw',
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0);

    // 3. 入场页面顺滑滑入
    tl.to(inPage, {
      x: '0%',
      opacity: 1,
      duration: 0.8,
      ease: "power3.inOut" 
    }, 0.1);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products', hasMegaMenu: true },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact Us' },
  ];

  // 提取全局复用的 Footer 组件
  const renderFooter = () => (
    <footer className="w-full bg-slate-50 py-24 px-12 border-t border-slate-200 z-20 relative">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16 lg:gap-8">
        
        {/* 列 1: 品牌与引导 */}
        <div className="w-full md:w-1/4 flex flex-col items-start">
          <div className="mb-4 md:mb-8 flex items-center -ml-4">
            <img src="/img/logo.png" alt="Company Logo" className="h-32 md:h-[180px] w-auto object-contain" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-2">Are You Ready To Start?</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">Contact us to tailor the most suitable product for your business.</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-[10px] tracking-widest hover:bg-red-700 hover:shadow-[0_10px_20px_rgba(220,38,38,0.2)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group">
            CONTACT US
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </button>
        </div>

        {/* 列 2: Products 菜单 */}
        <div className="w-full md:w-1/4 flex flex-col items-start lg:pl-10">
          <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-8">PRODUCTS</h4>
          <ul className="flex flex-col gap-4">
            {['Low Speed Electric Car', 'Electric Passenger Tricycle', 'Electric Pickup Truck', 'Electric Tuktuk', 'Electric Cargo Tricycle'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 group cursor-pointer" onClick={() => { transitionTo('products'); setActiveCategory(item); }}>
                <span className="text-red-600 font-black text-sm transform group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                <span className="text-[13px] text-slate-500 font-medium group-hover:text-red-600 transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 列 3: Information 菜单 */}
        <div className="w-full md:w-1/4 flex flex-col items-start">
          <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-8">INFORMATION</h4>
          <ul className="flex flex-col gap-4">
            {['About Us', 'News', 'Services', 'Download', 'Contact Us'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 group cursor-pointer">
                <span className="text-red-600 font-black text-sm transform group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                <span className="text-[13px] text-slate-500 font-medium group-hover:text-red-600 transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 列 4: Contact Us 联系信息 */}
        <div className="w-full md:w-1/4 flex flex-col items-start">
          <h4 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-8">CONTACT US</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors duration-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span className="text-[13px] text-slate-500 leading-relaxed font-medium group-hover:text-slate-900 transition-colors duration-300">
                No. 99 Qingping Road, Shanting District<br/>Economic Development Zone, Zaozhuang City,<br/>Shandong Province
              </span>
            </li>
            <li className="flex items-center gap-4 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="text-[13px] text-slate-500 font-medium group-hover:text-slate-900 transition-colors duration-300">+86 180 8677 3915</span>
            </li>
            <li className="flex items-center gap-4 group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-[13px] text-slate-500 font-medium group-hover:text-slate-900 transition-colors duration-300">charles.ji@niudianev.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright 底部版权条 */}
      <div className="w-full max-w-[1400px] mx-auto mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 Beijing Dahong Shiliu Technology Co., Ltd. All Rights Reserved.</p>
        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <span className="text-[10px] text-slate-400 font-bold hover:text-red-600 cursor-pointer uppercase tracking-widest transition-colors">Privacy Policy</span>
          <span className="text-[10px] text-slate-400 font-bold hover:text-red-600 cursor-pointer uppercase tracking-widest transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <div className="motion-overlay" id="blur-layer"></div>

      {/* 顶部导航栏 - 亮色玻璃态 */}
      <nav className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-8 md:px-12 py-2 bg-white/80 backdrop-blur-2xl border-b border-slate-200 transition-all duration-500 shadow-sm">
        <div className="cursor-pointer -ml-4 md:-ml-6" onClick={() => transitionTo('home')}>
          <img src="/img/logo.png" alt="Company Logo" className="h-20 md:h-[100px] w-auto object-contain" />
        </div>
        
        <ul className="flex items-center gap-10">
          {navItems.map((item) => (
            <li 
              key={item.id}
              className={`relative group cursor-pointer text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${currentId === item.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <div onClick={() => transitionTo(item.id)} className="py-2">
                {item.label}
              </div>
              
              {/* 超级菜单 (Mega Menu) */}
              {item.hasMegaMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 ease-out">
                  <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-2xl p-8 w-[600px]">
                    <div className="text-[10px] text-slate-400 mb-6 border-b border-slate-100 pb-4 tracking-widest font-bold">EXPLORE OUR CATEGORIES</div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                      {categories.map((cat, idx) => (
                        <div 
                          key={idx} 
                          className="text-sm text-slate-600 hover:text-red-600 hover:translate-x-1 transition-all duration-300 cursor-pointer capitalize font-semibold tracking-normal"
                        >
                          {cat as string}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 当前选中状态指示器 - 红色 */}
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full transition-all duration-300 ${currentId === item.id ? 'opacity-100 shadow-[0_0_8px_rgba(220,38,38,0.8)] scale-100' : 'opacity-0 scale-0'}`}></div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="viewport">
        <div className="stage" ref={stageRef} id="main-stage">
          
          {/* 页面 01: Home (全屏英雄区 + Product Series) */}
          <div id="home" className="page-wrapper" style={{ display: 'block' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#ffffff', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none">

                {/* 第一屏：全屏英雄区 */}
                <div className="relative w-full h-screen overflow-hidden flex items-center flex-none">
                  {/* 高清沙滩风景背景 */}
                  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/img/banner.png" 
                      alt="Hero Banner" 
                      className="w-full h-full object-cover object-bottom" 
                    />
                  </div>
                  
                  <div className="hero-content relative z-10 w-full max-w-[1400px] mx-auto px-12 flex flex-col lg:flex-row items-center justify-between h-full pt-16 will-change-transform">
                    
                    {/* 左侧：文案内容区 */}
                    <div className="flex flex-col items-start text-left w-full lg:w-[45%]">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase mb-8">
                        <div className="w-8 h-[2px] bg-blue-400"></div>
                        Resort & Leisure
                      </div>
                      
                      <h1 className="hero-title mb-8 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        Electric<br/>
                        <span className="text-white">Mobility.</span>
                      </h1>
                      
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md mb-12 tracking-wide font-[family-name:var(--font-inter)] drop-shadow-md">
                        We specialize in producing electric personal mobility vehicles, golf carts, as well as customized vehicle models for various scenic areas globally.
                      </p>
                      
                      <div className="flex gap-6">
                        <button 
                          onClick={() => transitionTo('products')}
                          className="px-10 py-4 bg-white text-black rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-50 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out"
                        >
                          Discover Products
                        </button>
                        <button 
                          onClick={() => transitionTo('about')}
                          className="px-10 py-4 bg-black/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:border-white hover:bg-white/10 transition-all duration-500 ease-out"
                        >
                          Our Story
                        </button>
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* 底部型号参数等点缀 */}
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20 pointer-events-none">
                    <div className="text-left">
                      <div className="text-[9px] text-white/60 tracking-[0.2em] uppercase mb-2 drop-shadow-md">Platform</div>
                      <div className="text-xs text-white font-bold tracking-wider drop-shadow-md">RESORT & SCENIC EDITION</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-white/60 tracking-[0.2em] uppercase mb-2 drop-shadow-md">Global Range</div>
                      <div className="text-xs text-white font-bold tracking-wider drop-shadow-md">AVAILABLE WORLDWIDE</div>
                    </div>
                  </div>
                  
                  {/* 向下滚动提示 */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-50">
                    <div className="text-[9px] text-white tracking-[0.3em] uppercase mb-3">Scroll</div>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                  </div>
                </div>

                {/* 第二屏：Product Series 分类展示区 (Light Theme) */}
                <div className="relative w-full bg-slate-50 py-40 px-12 z-20 flex flex-col items-center">
                  <div className="text-[10px] text-red-600 tracking-[0.4em] uppercase mb-6 font-bold">Discover Excellence</div>
                  <h2 className="text-[clamp(3rem,6vw,5rem)] font-black italic font-[family-name:var(--font-playfair)] text-slate-900 mb-24 text-center tracking-tighter leading-none">
                    Product Series.
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-[1600px]">
                    {categoryCards.map((cat, idx) => (
                      <div key={idx} className="group relative w-full aspect-[4/5] cursor-pointer">
                        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] bg-white transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] group-hover:border group-hover:border-red-600/20">
                          {/* 背景图：产品品类代表图，悬停时完全清晰 */}
                          <img 
                            src={cat.image} 
                            alt={cat.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                          />
                          {/* 黑色底部渐变遮罩，保证文字清晰 (即使在白底主题下，图片上的文字通常也需要暗色遮罩) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-[#060913]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
                          
                          {/* 文字内容 */}
                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                            <div>
                              <div className="text-[9px] text-red-400 tracking-[0.2em] uppercase mb-3">Series {(idx + 1).toString().padStart(2, '0')}</div>
                              <h3 className="text-xl font-bold text-white tracking-wide capitalize group-hover:text-red-50 transition-colors duration-500 leading-tight">
                                {cat.name}
                              </h3>
                            </div>
                            {/* 箭头悬停特效 (改用红色基调) */}
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 transform group-hover:translate-x-2">
                              <svg className="w-5 h-5 text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 第三屏：企业介绍区 (Corporate Intro) */}
                <div className="relative w-full bg-white py-32 px-12 z-20 flex flex-col items-center">
                  <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    
                    {/* 左侧：企业工厂图片 */}
                    <div className="w-full lg:w-[55%] relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                        alt="Factory Building" 
                        className="w-full h-auto aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                    </div>
                    
                    {/* 右侧：企业文案与视频入口 */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start relative pl-0 lg:pl-10">
                      <h2 className="text-4xl md:text-5xl font-black italic font-[family-name:var(--font-playfair)] text-slate-900 mb-6 tracking-tighter">
                        Pursue Innovation
                      </h2>
                          <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-8">
                            Beijing Dahong Shiliu Technology Co., Ltd.
                          </h3>
                          
                          <div className="text-slate-600 leading-relaxed mb-10 text-sm md:text-base font-medium flex flex-col gap-4">
                            <p>
                              Located in Beijing—China's hub of technological innovation and international trade—Beijing Dahong Shiliu Technology Co., Ltd. focuses on providing global customers with safe, practical, and cost-effective short-distance green mobility solutions.
                            </p>
                            <p>
                              Our core business centers on low-speed three-wheel and four-wheel electric vehicles, widely used for mobility assistance, short-distance commuting, and light cargo transport. Upholding the philosophy of "Quality First, Integrity-Based," we strictly control product quality and export standards. Our products have reached Southeast Asia, Africa, the Middle East, and beyond, earning deep trust and recognition from international clients.
                            </p>
                            <p>
                              With integrity as our cornerstone, we are committed to being a reliable partner for global clients, bringing green and convenient mobility to more countries and regions.
                            </p>
                          </div>
                      
                      <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-red-700 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                        VIEW MORE 
                        <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                      </button>

                      {/* 底部悬浮的视频播放入口 */}
                      <div className="absolute -bottom-16 right-0 w-72 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden flex group cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                        {/* 左侧垂直文字 */}
                        <div 
                          className="bg-red-600 text-white text-[10px] tracking-widest p-3 font-bold flex items-center justify-center rotate-180 uppercase" 
                          style={{ writingMode: 'vertical-rl' }}
                        >
                          Corporate Video
                        </div>
                        {/* 右侧视频封面 */}
                        <div className="relative flex-1 aspect-[16/9]">
                          <img 
                            src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=600&auto=format&fit=crop" 
                            alt="Corporate Video" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-500">
                            {/* 播放按钮 */}
                            <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>

                {/* 第四屏：全球销售网络 (Global Network) */}
                <div className="relative w-full bg-[#0a0f1c] py-32 px-12 z-20 flex flex-col items-center overflow-hidden">
                  
                  {/* 用于控制航线动画的内联样式 */}
                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes dash-flow {
                      to { stroke-dashoffset: -24; }
                    }
                    .animate-dash-flow {
                      animation: dash-flow 1.5s linear infinite;
                    }
                  `}} />

                  {/* 背景世界地图 (使用 SVG 矢量地图并应用暗色/金色滤镜) */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
                      alt="World Map" 
                      className="w-full h-[120%] object-contain max-w-[1400px] filter invert sepia-[0.3] hue-rotate-[320deg] saturate-[200%]"
                    />
                  </div>

                  <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[400px] py-12">
                    
                    {/* 左侧：联系文案区 */}
                    <div className="w-full lg:w-[40%] flex flex-col items-start relative z-20">
                      <span className="text-sm font-bold text-red-600 tracking-widest mb-4 uppercase">Get In Touch</span>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                        Talk To Our Team Today
                      </h2>
                      <p className="text-slate-400 leading-relaxed mb-10 text-sm md:text-base max-w-md">
                        We can give you the answer, for inquiries about our products, please leave your e-mail to us and will reply within 24 hours.
                      </p>
                      <button className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-red-700 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                        INQUIRY NOW 
                        <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                      </button>
                    </div>

                    {/* 中间：地图动效节点与航线 (直接用绝对定位的小圆点和虚线模拟) */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <linearGradient id="line-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                        {/* 航线路径 */}
                        <path d="M 1000 300 Q 800 150 650 250" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash-flow opacity-80" />
                        <path d="M 1000 300 Q 850 200 750 330" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash-flow opacity-60" style={{animationDuration: '2s'}} />
                        <path d="M 1000 300 Q 700 100 350 230" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash-flow opacity-80" style={{animationDuration: '2.5s'}} />
                        <path d="M 1000 300 Q 600 350 450 430" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash-flow opacity-50" style={{animationDuration: '3s'}} />
                      </svg>

                      {/* 起点：中国制造基地 */}
                      <div className="absolute top-[50%] left-[71.5%] w-5 h-5 bg-red-600 rounded-full border-4 border-[#0a0f1c] shadow-[0_0_15px_rgba(220,38,38,0.8)] transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                        <div className="absolute w-10 h-10 bg-red-600 rounded-full animate-ping opacity-50"></div>
                      </div>

                      {/* 目标节点 */}
                      <div className="absolute top-[41%] left-[46.5%] w-3 h-3 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      <div className="absolute top-[55%] left-[53.5%] w-3 h-3 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      <div className="absolute top-[38%] left-[25%] w-3 h-3 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      <div className="absolute top-[71%] left-[32%] w-3 h-3 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>

                    {/* 右侧：图例说明区 */}
                    <div className="w-full lg:w-[25%] flex flex-col items-start lg:items-end mt-16 lg:mt-0 relative z-20">
                      <div className="bg-[#12192b]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <h3 className="text-2xl font-black text-[#e5b25d] tracking-widest uppercase">
                          NIUDIAN<span className="text-white">EV</span>
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
                            {/* SVG Pin Icon */}
                            <svg className="w-8 h-8 text-purple-600 drop-shadow-[0_0_5px_rgba(147,51,234,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <div className="absolute top-[8px] w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-slate-300 text-sm font-medium tracking-wide">Manufacture base</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* 第五屏：Service Support (手风琴交互交互区) */}
                <div className="relative w-full bg-slate-50 py-32 px-12 z-20 flex flex-col items-center">
                  <div className="w-full max-w-[1400px] mx-auto">
                    {/* 头部标题 */}
                    <div className="flex items-center gap-4 mb-12">
                      <span className="text-xs font-bold text-red-600 tracking-wider whitespace-nowrap">Our Advantages</span>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Service Support
                      </h2>
                    </div>

                    {/* 手风琴展示区 */}
                    <div className="flex w-full h-[500px] bg-slate-100 rounded-none overflow-hidden shadow-sm border border-slate-200">
                      {servicesData.map((svc, idx) => {
                        const isActive = activeService === idx;
                        return (
                          <div 
                            key={idx}
                            onMouseEnter={() => setActiveService(idx)}
                            className={`relative h-full flex transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden ${isActive ? 'w-[55%] bg-red-600' : 'w-[15%] bg-slate-100 border-l border-slate-200/50 hover:bg-slate-200'}`}
                          >
                            {/* 激活状态展示 */}
                            <div className={`absolute inset-0 flex w-[calc(1400px*0.55)] h-full transition-opacity duration-500 delay-100 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                              {/* 左侧红色文字区 */}
                              <div className="w-[45%] h-full bg-red-600 p-12 flex flex-col justify-center text-white relative z-10 shrink-0">
                                <h3 className="text-3xl font-bold mb-6 leading-tight max-w-[80%]">
                                  {svc.title}
                                </h3>
                                <p className="text-red-100 text-sm leading-relaxed mb-12 line-clamp-4">
                                  {svc.desc}
                                </p>
                                <div className="mt-auto">
                                  <button className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-red-600 transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {/* 右侧图片区 */}
                              <div className="w-[55%] h-full relative shrink-0">
                                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                              </div>
                            </div>

                            {/* 非激活状态展示 */}
                            <div className={`absolute inset-0 w-[calc(1400px*0.15)] h-full p-8 flex flex-col justify-center transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                              <div className="mb-8">
                                {svc.icon}
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 leading-snug mb-12">
                                {svc.title}
                              </h3>
                              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center bg-transparent mt-auto">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 第六屏：产品用途场景 (Product Scenarios) - 玻璃态切换 */}
                <div className="relative w-full h-[800px] z-20 flex overflow-hidden bg-black">
                  {/* 背景图层：根据 activeScenario 切换背景，带淡入淡出 */}
                  {scenariosData.map((scenario, idx) => (
                    <div 
                      key={idx} 
                      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${activeScenario === idx ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <img src={scenario.bgImg} alt="Scenario Background" className="w-full h-full object-cover opacity-80" />
                    </div>
                  ))}

                  {/* 悬浮控制层：3个等宽列 */}
                  <div className="absolute inset-0 w-full flex z-10">
                    {scenariosData.map((scenario, idx) => {
                      const isActive = activeScenario === idx;
                      return (
                        <div 
                          key={idx}
                          onMouseEnter={() => setActiveScenario(idx)}
                          className={`flex-1 relative border-r border-white/20 last:border-r-0 transition-all duration-700 cursor-pointer overflow-hidden ${isActive ? 'bg-[#0a0f1c]/50 backdrop-blur-md' : 'bg-black/10 hover:bg-white/5'}`}
                        >
                          {/* 内部内容 (仅在激活时完全显示) */}
                          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-12 transition-all duration-700 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                            
                            {/* Icon 区域 */}
                            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center border-[6px] border-[#0a0f1c]/50 mb-10 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                              {scenario.icon}
                            </div>

                            {/* 标题文案 */}
                            <h3 className="text-3xl font-bold text-white mb-10 leading-snug drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] max-w-[80%]">
                              {scenario.title}
                            </h3>

                            {/* 竖线分隔 */}
                            <div className="w-[1px] h-16 bg-white/40 mb-10"></div>

                            {/* 按钮 */}
                            <button className="px-10 py-3 rounded-full border border-white/60 text-white text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-colors duration-300 backdrop-blur-sm">
                              READ MORE
                            </button>
                          </div>

                          {/* 底部巨大序号水印 */}
                          <div className={`absolute bottom-[-2%] left-8 text-[10rem] font-black leading-none select-none pointer-events-none font-[family-name:var(--font-inter)] transition-all duration-700 ${isActive ? 'text-white/20' : 'text-white/10'}`}>
                            {scenario.id}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 第七屏：Contact Us (询盘与联系我们) */}
                <div className="relative w-full bg-white py-32 px-12 z-20 flex flex-col items-center">
                  <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* 左侧：联系信息与标语 */}
                    <div className="w-full lg:w-[40%] flex flex-col items-start justify-center">
                      <span className="text-xs font-bold text-red-600 tracking-[0.3em] uppercase mb-6">Contact Us</span>
                      <h2 className="text-4xl md:text-6xl font-black italic font-[family-name:var(--font-playfair)] text-slate-900 mb-8 tracking-tighter leading-tight">
                        Let's Start a<br/>Conversation.
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-12 text-sm md:text-base font-medium max-w-md">
                        Whether you have a question about our electric vehicles, pricing, or customized solutions, our global team is ready to answer all your questions.
                      </p>

                      <div className="flex flex-col gap-8 w-full">
                        {/* Email */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Email Us</p>
                            <p className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">sales@niudianev.com</p>
                          </div>
                        </div>
                        {/* Phone */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Call Us</p>
                            <p className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">+86 400 123 4567</p>
                          </div>
                        </div>
                        {/* Location */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Headquarters</p>
                            <p className="text-base font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors">Zaozhuang City, Shandong Province,<br/>China</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧：高级询盘表单 */}
                    <div className="w-full lg:w-[60%] relative">
                      {/* 背景装饰框 */}
                      <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10"></div>
                      
                      <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
                        {/* 顶角红色滑动装饰线 */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 mb-10">Send an Inquiry</h3>
                        
                        <form className="flex flex-col gap-6">
                          {/* 姓名与邮箱 */}
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 relative">
                              <input type="text" id="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Name" />
                              <label htmlFor="name" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Your Name</label>
                            </div>
                            <div className="flex-1 relative">
                              <input type="email" id="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Email" />
                              <label htmlFor="email" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Email Address</label>
                            </div>
                          </div>
                          
                          {/* 意向产品下拉框 */}
                          <div className="relative">
                            <select id="interest" defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all appearance-none cursor-pointer invalid:text-slate-400">
                              <option value="" disabled hidden>Product of Interest</option>
                              <option value="golf-cart" className="text-slate-900">Electric Golf Cart</option>
                              <option value="pickup" className="text-slate-900">Electric Pickup Truck</option>
                              <option value="resort" className="text-slate-900">Resort & Scenic Vehicle</option>
                              <option value="other" className="text-slate-900">Other Customized Models</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>

                          {/* 留言内容区 */}
                          <div className="relative">
                            <textarea id="message" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                            <label htmlFor="message" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Project Details or Questions</label>
                          </div>

                          {/* 提交按钮 */}
                          <button type="button" className="w-full bg-[#0a0f1c] text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-600 hover:shadow-[0_15px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-4 group">
                            SUBMIT INQUIRY
                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </button>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 第八屏：Footer 底部导航栏 */}
                {renderFooter()}

              </div>
            </div>
          </div>

          {/* 页面 03: Products (产品列表页) */}
          <div id="products" className="page-wrapper" style={{ display: 'none' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#f8fafc', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none min-h-screen flex flex-col">
                
                {/* 顶部 Banner */}
                <div className="relative w-full h-[45vh] bg-[#0a0f1c] flex items-center justify-center overflow-hidden shrink-0 mt-24">
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=2070&auto=format&fit=crop" alt="Products Banner" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-20 text-center px-12">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Explore Our Fleet</span>
                    <h1 className="text-5xl md:text-7xl font-black italic font-[family-name:var(--font-playfair)] text-white mb-6 drop-shadow-lg">
                      Our Products.
                    </h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* 核心内容区：左侧分类侧边栏 + 右侧产品网格 */}
                <div className="w-full max-w-[1400px] mx-auto px-12 py-24 flex flex-col lg:flex-row gap-16 flex-1">
                  
                  {/* 左侧：分类侧边栏 */}
                  <div className="w-full lg:w-[25%] shrink-0">
                    <div className="sticky top-40 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 p-8">
                      <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-6 flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        Categories
                      </h3>
                      <ul className="flex flex-col gap-2">
                        <li 
                          onClick={() => setActiveCategory('All')}
                          className={`px-5 py-4 rounded-xl cursor-pointer font-bold text-[13px] transition-all duration-300 flex items-center justify-between group ${activeCategory === 'All' ? 'bg-red-600 text-white shadow-[0_8px_20px_rgba(220,38,38,0.25)]' : 'text-slate-600 hover:bg-red-50 hover:text-red-600'}`}
                        >
                          All Products
                          <span className={`transform transition-transform duration-300 ${activeCategory === 'All' ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>&rsaquo;</span>
                        </li>
                        {categories.map((cat, idx) => (
                          <li 
                            key={idx}
                            onClick={() => setActiveCategory(cat as string)}
                            className={`px-5 py-4 rounded-xl cursor-pointer font-bold text-[13px] transition-all duration-300 flex items-center justify-between group ${activeCategory === cat ? 'bg-red-600 text-white shadow-[0_8px_20px_rgba(220,38,38,0.25)]' : 'text-slate-600 hover:bg-red-50 hover:text-red-600'}`}
                          >
                            <span className="capitalize line-clamp-1">{cat as string}</span>
                            <span className={`transform transition-transform duration-300 shrink-0 ${activeCategory === cat ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>&rsaquo;</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 右侧：产品展示网格 */}
                  <div className="w-full lg:w-[75%] grid grid-cols-1 md:grid-cols-2 gap-10 self-start">
                    {filteredProducts.map((prod: any, idx: number) => (
                      <div 
                        key={idx} 
                        onClick={() => { setSelectedProduct(prod); transitionTo('product-detail'); }}
                        className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden group hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
                      >
                        
                        {/* 产品图区 */}
                        <div className="w-full aspect-[4/3] bg-slate-50 relative overflow-hidden p-8 flex items-center justify-center">
                          <img src={prod.Thumbnail || 'https://via.placeholder.com/400?text=No+Image'} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={prod['Product Name']} />
                          {/* 悬停时的遮罩和按钮 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                          <div className="absolute bottom-6 right-6 bg-red-600 text-white text-[10px] font-bold px-5 py-2.5 rounded-full tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_10px_20px_rgba(220,38,38,0.3)]">
                            View Details
                          </div>
                        </div>

                        {/* 产品信息区 */}
                        <div className="p-8 flex flex-col flex-1">
                          <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-3 bg-red-50 w-max px-3 py-1 rounded-md">{prod.Category}</div>
                          <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mb-4">
                            {prod['Product Name']}
                          </h3>
                          {/* 简短描述 */}
                          <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
                            High-performance electric mobility solution designed for efficiency and comfort. Contact us for detailed specifications.
                          </p>
                        </div>

                      </div>
                    ))}
                    
                    {/* 无产品状态 */}
                    {filteredProducts.length === 0 && (
                      <div className="col-span-full py-20 text-center">
                        <p className="text-slate-400 text-lg">No products found in this category.</p>
                      </div>
                    )}
                  </div>
                  
                </div>

                {/* 底部复用 Footer */}
                {renderFooter()}

              </div>
            </div>
          </div>

          {/* 页面 06: Product Detail (产品详情页) */}
          <div id="product-detail" className="page-wrapper" style={{ display: 'none' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#f8fafc', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none min-h-screen flex flex-col">
                
                {selectedProduct && (
                  <>
                    {/* 详情页顶部 Banner */}
                    <div className="relative w-full h-[60vh] bg-[#0a0f1c] flex items-center justify-center overflow-hidden shrink-0 mt-24">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0f1c] z-10"></div>
                      <img 
                        src={selectedProduct.Thumbnail || 'https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=2070&auto=format&fit=crop'} 
                        alt={selectedProduct['Product Name']} 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm scale-105" 
                      />
                      
                      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-12 flex flex-col items-center text-center mt-12">
                        {/* 面包屑导航 */}
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase mb-8">
                          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => transitionTo('home')}>Home</span>
                          <span className="text-red-500">/</span>
                          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => { setActiveCategory(selectedProduct.Category); transitionTo('products'); }}>Products</span>
                          <span className="text-red-500">/</span>
                          <span className="text-white">{selectedProduct.Category}</span>
                        </div>
                        
                        {/* 主标题 */}
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight max-w-4xl leading-tight drop-shadow-2xl">
                          {selectedProduct['Product Name']}
                        </h1>
                        
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => transitionTo('contact')}
                            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-red-700 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                          >
                            REQUEST A QUOTE
                          </button>
                          <button 
                            onClick={() => transitionTo('products')}
                            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300"
                          >
                            BACK TO FLEET
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 详情内容区 */}
                    <div className="w-full max-w-[1400px] mx-auto px-12 py-24 flex flex-col lg:flex-row gap-16 flex-1">
                      
                      {/* 左侧：富文本描述内容 */}
                      <div className="w-full lg:w-[70%]">
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
                          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
                            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                            Product Overview
                          </h2>
                          
                          <div 
                            ref={detailContentRef}
                            className="product-html-content"
                            dangerouslySetInnerHTML={{ 
                              __html: selectedProduct['Description HTML'] || '<p class="text-slate-500">No detailed description available for this product.</p>' 
                            }}
                          />
                        </div>
                      </div>

                      {/* 右侧：吸顶联系卡片 & 快速参数 */}
                      <div className="w-full lg:w-[30%] shrink-0">
                        <div className="sticky top-32 flex flex-col gap-8">
                          
                          {/* 产品缩略图卡片 */}
                          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center">
                            <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-6 flex items-center justify-center p-4">
                              <img src={selectedProduct.Thumbnail || 'https://via.placeholder.com/400'} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="w-full">
                              <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">Category</div>
                              <div className="text-sm font-bold text-slate-900 mb-4">{selectedProduct.Category}</div>
                              <button onClick={() => transitionTo('contact')} className="w-full py-4 bg-[#0a0f1c] text-white rounded-xl font-bold text-xs tracking-widest hover:bg-red-600 transition-colors duration-300">
                                INQUIRE NOW
                              </button>
                            </div>
                          </div>

                          {/* 快速联系支持卡片 */}
                          <div className="bg-red-600 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(220,38,38,0.2)] text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-xl font-bold mb-4">Need Customization?</h3>
                            <p className="text-red-100 text-sm leading-relaxed mb-8">
                              Our engineering team can customize the battery, motor, and seating capacity according to your specific scenario requirements.
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                              </div>
                              <div>
                                <div className="text-[10px] text-red-200 tracking-widest uppercase mb-1">24/7 Hotline</div>
                                <div className="font-bold">+86 400 123 4567</div>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      
                    </div>
                  </>
                )}

                {/* 底部复用 Footer */}
                {renderFooter()}

              </div>
            </div>
          </div>

          {/* 页面 02: About Us (关于我们) */}
          <div id="about" className="page-wrapper" style={{ display: 'none' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#f8fafc', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none min-h-screen flex flex-col">
                
                {/* About 顶部 Banner */}
                <div className="relative w-full h-[50vh] bg-[#0a0f1c] flex items-center justify-center overflow-hidden shrink-0 mt-24">
                  <div className="absolute inset-0 bg-black/50 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="About Us Banner" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-20 text-center px-12">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Heritage & Vision</span>
                    <h1 className="text-5xl md:text-7xl font-black italic font-[family-name:var(--font-playfair)] text-white mb-6 drop-shadow-lg">
                      About Us.
                    </h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* 企业介绍模块 */}
                <div className="w-full bg-white py-32 px-12 relative z-20">
                  <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    {/* 左侧：企业大楼/生产基地展示 */}
                    <div className="w-full lg:w-1/2 relative group rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Company HQ" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    {/* 右侧：详细介绍与数据统计 */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-8">
                      <span className="text-xs font-bold text-red-600 tracking-[0.3em] uppercase mb-4">Beijing Dahong Shiliu</span>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                        Driving the Future of <br/>Green Mobility.
                      </h2>
                      <div className="text-slate-600 leading-relaxed mb-12 text-sm md:text-base font-medium flex flex-col gap-4">
                        <p>
                          Located in Beijing—China's hub of technological innovation and international trade—Beijing Dahong Shiliu Technology Co., Ltd. focuses on providing global customers with safe, practical, and cost-effective short-distance green mobility solutions.
                        </p>
                        <p>
                          Our core business centers on low-speed three-wheel and four-wheel electric vehicles, widely used for mobility assistance, short-distance commuting, and light cargo transport. Upholding the philosophy of "Quality First, Integrity-Based," we strictly control product quality and export standards. Our products have reached Southeast Asia, Africa, the Middle East, and beyond, earning deep trust and recognition from international clients.
                        </p>
                        <p>
                          With integrity as our cornerstone, we are committed to being a reliable partner for global clients, bringing green and convenient mobility to more countries and regions.
                        </p>
                      </div>
                      
                      {/* 数据统计网格 */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full pt-8 border-t border-slate-100">
                        <div>
                          <div className="text-4xl font-black text-slate-900 mb-2 flex items-baseline">2,000<span className="text-red-600 text-2xl ml-1">+</span></div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acres Area</div>
                        </div>
                        <div>
                          <div className="text-4xl font-black text-slate-900 mb-2 flex items-baseline">1,500<span className="text-red-600 text-2xl ml-1">+</span></div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Employees</div>
                        </div>
                        <div>
                          <div className="text-4xl font-black text-slate-900 mb-2 flex items-baseline">400<span className="text-red-600 text-2xl ml-1">k</span></div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Annual Output</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 核心价值观模块 (暗色玻璃态卡片) */}
                <div className="w-full bg-[#0a0f1c] py-32 px-12 relative overflow-hidden border-t border-white/5">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                  </div>
                  
                  <div className="w-full max-w-[1400px] mx-auto relative z-10 text-center mb-20">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Philosophy</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Core Values.</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">The fundamental principles that guide our innovation, manufacturing processes, and global partnerships.</p>
                  </div>
                  
                  <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {/* Value 1 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Continuous R&D investment to lead the electric mobility revolution with cutting-edge tech.</p>
                    </div>
                    {/* Value 2 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Quality</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">World-class manufacturing precision, certified by EEC, CCC, and ISO standards globally.</p>
                    </div>
                    {/* Value 3 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-500 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Sustainability</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Committed to reducing carbon footprints and promoting eco-friendly transportation solutions.</p>
                    </div>
                    {/* Value 4 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-500 flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Customer First</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Dedicated 24/7 global support, prioritizing client success and long-term partnerships.</p>
                    </div>
                  </div>
                </div>

                {/* CTA / Join Us 区域 */}
                <div className="w-full bg-slate-50 py-32 px-12 border-t border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100">
                    <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-6">Partner With DAHONG SHILIU</h2>
                  <p className="text-slate-500 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                    Join our expanding global network. Experience unparalleled quality, service, and innovation with Beijing Dahong Shiliu Technology.
                  </p>
                  <button onClick={() => transitionTo('contact')} className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-red-700 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                    GET IN TOUCH
                    <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform duration-300">&rsaquo;</span>
                  </button>
                </div>

                {/* 底部复用 Footer */}
                {renderFooter()}

              </div>
            </div>
          </div>

          {/* 页面 04: Services (服务页) */}
          <div id="services" className="page-wrapper" style={{ display: 'none' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#f8fafc', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none min-h-screen flex flex-col">
                
                {/* Services 顶部 Banner */}
                <div className="relative w-full h-[50vh] bg-[#0a0f1c] flex items-center justify-center overflow-hidden shrink-0 mt-24">
                  <div className="absolute inset-0 bg-black/50 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop" alt="Services Banner" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-20 text-center px-12">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">End-To-End Support</span>
                    <h1 className="text-5xl md:text-7xl font-black italic font-[family-name:var(--font-playfair)] text-white mb-6 drop-shadow-lg">
                      Our Services.
                    </h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* 核心服务区域 (交替布局) */}
                <div className="w-full max-w-[1400px] mx-auto px-12 py-32 flex flex-col gap-32">
                  {servicesData.map((svc, idx) => (
                    <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      {/* 图片 */}
                      <div className="w-full lg:w-1/2 relative group rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                        <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                        <img src={svc.img} alt={svc.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                      {/* 内容 */}
                      <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-8 border border-red-100 shadow-sm">
                          {svc.icon}
                        </div>
                        <div className="text-[10px] text-red-500 font-bold tracking-[0.3em] uppercase mb-4">Service {String(idx + 1).padStart(2, '0')}</div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                          {svc.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base mb-10 max-w-lg">
                          {svc.desc}
                          <br/><br/>
                          We employ industry-leading standards and a highly skilled team to ensure that this aspect of our service exceeds your expectations and guarantees absolute reliability for your fleet operations.
                        </p>
                        <button onClick={() => transitionTo('contact')} className="flex items-center gap-4 text-sm font-bold text-slate-900 group">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </div>
                          <span className="group-hover:text-red-600 transition-colors uppercase tracking-widest text-xs">Inquire More</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 质保与承诺模块 */}
                <div className="w-full bg-[#0a0f1c] py-32 px-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-red-600/5 blur-[120px] rounded-full"></div>
                  </div>
                  
                  <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="w-full md:w-1/2">
                      <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-4 block">Our Commitment</span>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Global Quality<br/>Assurance.</h2>
                      <p className="text-slate-400 leading-relaxed mb-10">
                        Every vehicle leaving our facility undergoes rigorous multi-point inspections. We offer comprehensive warranty coverage and genuine replacement parts to keep your fleet running smoothly worldwide.
                      </p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-4xl font-black text-white mb-2">24<span className="text-red-500">/7</span></div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Support</div>
                        </div>
                        <div>
                          <div className="text-4xl font-black text-white mb-2">3<span className="text-red-500">Y</span></div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Core Warranty</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                        <svg className="w-8 h-8 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        <h4 className="text-white font-bold mb-2">Genuine Parts</h4>
                        <p className="text-slate-400 text-sm">100% original manufacturer parts guaranteed.</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors sm:mt-8">
                        <svg className="w-8 h-8 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <h4 className="text-white font-bold mb-2">Maintenance</h4>
                        <p className="text-slate-400 text-sm">Scheduled service plans available globally.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部复用 Footer */}
                {renderFooter()}

              </div>
            </div>
          </div>

          {/* 页面 05: Contact Us (联系我们) */}
          <div id="contact" className="page-wrapper" style={{ display: 'none' }}>
            <div className="page justify-start items-start !p-0 overflow-y-auto overflow-x-hidden" style={{ background: '#f8fafc', display: 'block' }}>
              <div className="scroll-content w-full relative h-max flex-none min-h-screen flex flex-col">
                
                {/* Contact 顶部 Banner */}
                <div className="relative w-full h-[50vh] bg-[#0a0f1c] flex items-center justify-center overflow-hidden shrink-0 mt-24">
                  <div className="absolute inset-0 bg-black/60 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Contact Banner" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-20 text-center px-12">
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">We're Here to Help</span>
                    <h1 className="text-5xl md:text-7xl font-black italic font-[family-name:var(--font-playfair)] text-white mb-6 drop-shadow-lg">
                      Contact Us.
                    </h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* 联系表单与信息区 (与首页一致的高级表单交互) */}
                <div className="relative w-full bg-white py-32 px-12 z-20 flex flex-col items-center">
                  <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* 左侧：联系信息与标语 */}
                    <div className="w-full lg:w-[40%] flex flex-col items-start justify-center">
                      <span className="text-xs font-bold text-red-600 tracking-[0.3em] uppercase mb-6">Get In Touch</span>
                      <h2 className="text-4xl md:text-6xl font-black italic font-[family-name:var(--font-playfair)] text-slate-900 mb-8 tracking-tighter leading-tight">
                        Let's Start a<br/>Conversation.
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-12 text-sm md:text-base font-medium max-w-md">
                        Whether you have a question about our electric vehicles, pricing, or customized solutions, our global team is ready to answer all your questions.
                      </p>

                      <div className="flex flex-col gap-8 w-full">
                        {/* Email */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Email Us</p>
                            <p className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">sales@niudianev.com</p>
                          </div>
                        </div>
                        {/* Phone */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Call Us</p>
                            <p className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">+86 400 123 4567</p>
                          </div>
                        </div>
                        {/* Location */}
                        <div className="flex items-start gap-6 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300 shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Headquarters</p>
                            <p className="text-base font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors">Zaozhuang City, Shandong Province,<br/>China</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧：高级询盘表单 */}
                    <div className="w-full lg:w-[60%] relative">
                      {/* 背景装饰框 */}
                      <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10"></div>
                      
                      <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
                        {/* 顶角红色滑动装饰线 */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 mb-10">Send an Inquiry</h3>
                        
                        <form className="flex flex-col gap-6">
                          {/* 姓名与邮箱 */}
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 relative">
                              <input type="text" id="contact-name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Name" />
                              <label htmlFor="contact-name" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Your Name</label>
                            </div>
                            <div className="flex-1 relative">
                              <input type="email" id="contact-email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Email" />
                              <label htmlFor="contact-email" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Email Address</label>
                            </div>
                          </div>
                          
                          {/* 电话与公司 */}
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 relative">
                              <input type="text" id="contact-phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Phone" />
                              <label htmlFor="contact-phone" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Phone Number</label>
                            </div>
                            <div className="flex-1 relative">
                              <input type="text" id="contact-company" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent" placeholder="Company" />
                              <label htmlFor="contact-company" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Company Name</label>
                            </div>
                          </div>
                          
                          {/* 意向产品下拉框 */}
                          <div className="relative">
                            <select id="contact-interest" defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all appearance-none cursor-pointer invalid:text-slate-400">
                              <option value="" disabled hidden>Product of Interest</option>
                              <option value="golf-cart" className="text-slate-900">Electric Golf Cart</option>
                              <option value="pickup" className="text-slate-900">Electric Pickup Truck</option>
                              <option value="resort" className="text-slate-900">Resort & Scenic Vehicle</option>
                              <option value="other" className="text-slate-900">Other Customized Models</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>

                          {/* 留言内容区 */}
                          <div className="relative">
                            <textarea id="contact-message" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-sm text-slate-900 outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                            <label htmlFor="contact-message" className="absolute left-6 top-4 text-sm text-slate-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1 pointer-events-none">Project Details or Questions</label>
                          </div>

                          {/* 提交按钮 */}
                          <button type="button" className="w-full bg-[#0a0f1c] text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-600 hover:shadow-[0_15px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-4 group">
                            SUBMIT INQUIRY
                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </button>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 分支机构及网点区 */}
                <div className="w-full bg-slate-50 py-24 px-12 border-t border-slate-100">
                  <div className="w-full max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Global Offices</h2>
                      <p className="text-slate-500 max-w-2xl mx-auto">Operating across multiple time zones to provide seamless support and vehicle delivery to our worldwide partners.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Office 1 */}
                      <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">China Headquarters</h3>
                        <p className="text-sm text-slate-500 mb-4">Main manufacturing base and global operations center.</p>
                        <p className="text-sm font-medium text-slate-700">Zaozhuang City, Shandong Province</p>
                      </div>

                      {/* Office 2 */}
                      <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Southeast Asia Hub</h3>
                        <p className="text-sm text-slate-500 mb-4">Regional distribution, sales, and technical support.</p>
                        <p className="text-sm font-medium text-slate-700">Bangkok, Thailand</p>
                      </div>

                      {/* Office 3 */}
                      <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Europe Office</h3>
                        <p className="text-sm text-slate-500 mb-4">Market development and compliance certification.</p>
                        <p className="text-sm font-medium text-slate-700">Frankfurt, Germany</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部复用 Footer */}
                {renderFooter()}

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
