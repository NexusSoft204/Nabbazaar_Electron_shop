import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';

async function fetchSingleBlog(slug) {
  try {
    
    const res = await fetch("http://127.0.0.1:8000/api/blog/", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    
    const data = await res.json();
    const finalData = Array.isArray(data) ? data : data.results || [];
    
    
    return finalData.find((item) => item.slug === slug && item.is_active) || null;
  } catch (error) {
    console.error("Error reading details payload:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }) {

  const { slug } = await params;
  const post = await fetchSingleBlog(slug);

  if (!post) {
    notFound(); 
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article className="w-full min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Navigation Breadcrumb Backspace Link */}
        <div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary-blue transition-colors group cursor-pointer"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to ElectroShop Blog
          </Link>
        </div>

        {/* Meta Headers Stack */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Tag size={12} />
            {post.category}
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-montserrat font-bold leading-tight capitalize">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 items-center text-sm font-inter pt-2 border-b border-[var(--color-deep-navy)]/60 pb-4">
            <span className="flex items-center gap-1.5">
              <User size={15} className="text-highlight" />
              Published by <strong className="font-medium">{post.author}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Feature Cover Canvas Display Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Core Markdown Article Description Text Layout */}
        <div className="text-sm text-justify  leading-8 whitespace-pre-line space-y-6 pt-4 font-inter">
          {post.description}
        </div>

      </div>
    </article>
  );
}
