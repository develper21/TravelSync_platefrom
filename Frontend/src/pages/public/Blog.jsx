import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../services/api';

const blogTags = ['All', 'Eco-Travel', 'Sustainability', 'Adventure', 'Hotels', 'Tips', 'Hidden Gems'];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    fetchBlogs();
  }, [search, activeTag]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (activeTag !== 'All') params.tag = activeTag;

      const res = await api.get('/blogs', { params });
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const featured = blogs[0];
  const regularPosts = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-green-700 bg-green-100 px-4 py-1.5 rounded-full">
            TravelSync Magazine
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            Travel Stories & Sustainable Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Actionable eco-travel insights, cultural guides, and hidden wonders from responsible explorers worldwide.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-12 space-y-4">
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search travel tips, articles, or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 py-3 rounded-2xl"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
            {blogTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeTag === tag
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading inspiring reads...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800">No articles found</h3>
            <p className="text-gray-500 mt-2 mb-6">Try searching with a different keyword or resetting filters.</p>
            <Button onClick={() => { setSearch(''); setActiveTag('All'); }}>Reset Filters</Button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-14">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                      <img
                        src={featured.image || '/images/blog1.png'}
                        alt={featured.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Featured Guide
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {new Date(featured.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-snug">
                          {featured.title}
                        </h2>
                        <p className="text-gray-600 text-base mb-6 leading-relaxed">
                          {featured.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {featured.author ? featured.author[0] : 'S'}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{featured.author}</p>
                            <p className="text-xs text-gray-500">{featured.readTime || '5 min read'}</p>
                          </div>
                        </div>

                        <Link to={`/blog/${featured._id}`}>
                          <Button className="font-bold rounded-xl shadow-md">
                            Read Full Story
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Posts Grid */}
            {regularPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-8">Latest Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-52 overflow-hidden relative">
                          <img
                            src={post.image || '/images/blog2.png'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700">
                            {post.tags?.[0] || 'Travel'}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <span>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.readTime || '5 min read'}</span>
                          </div>

                          <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>

                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50">
                        <span className="text-xs font-bold text-gray-700">{post.author}</span>
                        <Link to={`/blog/${post._id}`}>
                          <Button size="sm" variant="outline" className="rounded-xl font-bold">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
