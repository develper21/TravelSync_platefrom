import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowLeft,
  FaComment,
  FaPaperPlane,
  FaTag,
  FaShareAlt
} from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error('Failed to load blog:', err);
      setError('Article not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to comment on this article!');
      navigate('/signin');
      return;
    }

    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await api.post(`/blogs/${id}/comment`, {
        comment: commentText.trim()
      });
      setBlog(res.data);
      setCommentText('');
    } catch (err) {
      console.error('Failed to post comment:', err);
      alert('Could not post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="text-center py-32">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading story...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="max-w-2xl mx-auto text-center py-32 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'This travel post may have been removed.'}</p>
          <Link to="/blog">
            <Button>
              <FaArrowLeft className="mr-2" /> Back to Travel Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-8 bg-blue-50 px-4 py-2 rounded-full transition"
        >
          <FaArrowLeft /> Back to Travel Blog
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {(blog.tags || ['Travel']).map((t, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-gray-200 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                {blog.author ? blog.author[0] : 'T'}
              </div>
              <div>
                <p className="font-bold text-gray-900">{blog.author}</p>
                <p className="text-xs">TravelSync Contributor</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-blue-500" />
                {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="text-blue-500" />
                {blog.readTime || '5 min read'}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg mb-10 h-80 sm:h-[420px] relative">
          <img
            src={blog.image || '/images/blog1.png'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-12">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-lg whitespace-pre-line font-serif">
            {blog.content}
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <FaComment className="text-blue-600 text-2xl" />
            <h3 className="text-2xl font-bold text-gray-900">
              Discussion ({blog.comments?.length || 0})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-10 space-y-4">
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Join the conversation... Share your thoughts or travel tips"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <Button type="submit" disabled={submittingComment}>
              <FaPaperPlane className="mr-2" />
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comm, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{comm.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(comm.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{comm.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-6 text-sm">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
