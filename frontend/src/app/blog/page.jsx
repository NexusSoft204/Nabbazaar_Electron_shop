import React from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blog/`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const finalData = Array.isArray(data) ? data : data.results || [];
    return finalData.filter((item) => item.is_active);
  } catch (error) {
    console.error("Error fetching server blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="w-full min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ElectroShop <span className="text-highlight">Insights</span>
          </h1>
          <p className="text-metallic-silver text-sm sm:text-base">
            Stay ahead with the latest electronics buying guides, comparisons, and expert reviews in 2026.
          </p>
        </div>

        {/* Blog Posts Grid System */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => {
              const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              });

              return (
                <article 
                  key={post.id}
                  className="group flex flex-col border border-deep-navy/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-primary-blue/80 hover:bg-deep-navy/30 transition-all  duration-500 transform hover:-translate-y-1.5"
                >
                  {/* Image Container Canvas with Advanced Zoom & Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-deep-navy">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                    />

                    {/* Dark Vignette Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Modernized Floating Glassmorphism Category Tag */}
                    <div className="absolute top-4 left-4 bg-deep-navy/60 backdrop-blur-md border border-white/10  text-white text-xs font-semibold px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center  gap-1.5 shadow-sm transition-colors duration-300 group-hover:bg-primary-blue     group-hover:border-primary-blue">
                      <Tag size={12} className="text-highlight group-hover:text-white transition-colors" />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  {/* Meta & Main Content Package */}
                  <div className="p-6 flex flex-col flex-1 space-y-4 relative">

                    {/* Subtle Background Light Accent on Hover */}
                    <div className="absolute -inset-px bg-radial from-highlight/5 via-transparent to-transparent                opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-2xl" /          >

                    {/* Sleek Row Meta Elements */}
                    <div className="flex items-center gap-5 text-xs text-deep-navy font-inter">
                      <span className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                        <div className="w-5 h-5 rounded-full bg-deep-navy flex items-center justify-center border               border-deep-navy">
                          <User size={11} className="text-highlight" />
                        </div>
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-deep-navy" />
                        {formattedDate}
                      </span>
                    </div>

                    {/* Dynamic Creative Title Link Stack */}
                    <h2 className="text-xl font-bold font-montserrat capitalize line-clamp-2 tracking-tight leading-snug                 group-hover:text-highlight transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Description Body Paragraph */}
                    <p className="text-sm text-deep-navy font-inter leading-relaxed line-clamp-2 flex-1 opacity-90               group-hover:opacity-100 transition-opacity">
                      {post.description}
                    </p>

                    {/* Clean CTA Divider Row */}
                    <div className="pt-4 border-t border-deep-navy/30 flex items-center justify-between">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center font-montserrat gap-1.5 text-sm font-bold text-primary-blue                 hover:text-highlight transition-colors cursor-pointer group/btn"
                      >
                        Read Full Article
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1                text-highlight" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-deep-navy/10 rounded-2xl border border-deep-navy">
            <p className="text-[var(--color-metallic-silver">No blog posts found matching active criteria.</p>
          </div>
        )}

      </div>
    </main>
  );
}
