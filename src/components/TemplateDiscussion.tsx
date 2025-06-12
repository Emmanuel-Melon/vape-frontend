import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, ThumbsUp, ThumbsDown, Reply, Send, 
  Star, Award, Clock, User, MoreVertical, Flag, 
  Heart, Bookmark, Share2, Filter, SortDesc
} from 'lucide-react';

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: 'verified' | 'expert' | 'top-seller';
    reputation: number;
  };
  content: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isHelpful: boolean;
  userVote?: 'up' | 'down';
}

interface TemplateDiscussionProps {
  templateId: string;
  templateTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const dummyComments: Comment[] = [
  {
    id: 'comment-1',
    author: {
      id: 'user-1',
      name: 'VapeExpert_Mike',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      badge: 'expert',
      reputation: 2840
    },
    content: 'This template is fantastic! I\'ve been using it for 2 weeks now and the flavor profile recommendations are spot on. The temperature curve really brings out the terpenes.',
    timestamp: Date.now() - 3600000, // 1 hour ago
    likes: 12,
    dislikes: 0,
    replies: [
      {
        id: 'reply-1',
        author: {
          id: 'user-2',
          name: 'FlavorChaser_Sarah',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
          badge: 'verified',
          reputation: 1950
        },
        content: 'Totally agree! What temperature do you start at? I\'ve been experimenting with 365°F.',
        timestamp: Date.now() - 1800000, // 30 min ago
        likes: 5,
        dislikes: 0,
        replies: [],
        isHelpful: false
      }
    ],
    isHelpful: true
  },
  {
    id: 'comment-2',
    author: {
      id: 'user-3',
      name: 'NewVaper_Alex',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      reputation: 150
    },
    content: 'Quick question - is this template suitable for someone who\'s never used a convection vaporizer before? The description mentions it\'s for advanced users.',
    timestamp: Date.now() - 7200000, // 2 hours ago
    likes: 3,
    dislikes: 0,
    replies: [],
    isHelpful: false
  },
  {
    id: 'comment-3',
    author: {
      id: 'user-4',
      name: 'TechVaper_David',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      badge: 'top-seller',
      reputation: 3200
    },
    content: 'Love the detailed breakdown of airflow settings! One suggestion: could you add a section about cleaning frequency? I find that affects flavor significantly.',
    timestamp: Date.now() - 10800000, // 3 hours ago
    likes: 8,
    dislikes: 1,
    replies: [],
    isHelpful: true
  }
];

export const TemplateDiscussion: React.FC<TemplateDiscussionProps> = ({
  templateId,
  templateTitle,
  isOpen,
  onClose
}) => {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'popular'>('helpful');
  const [filterBy, setFilterBy] = useState<'all' | 'questions' | 'reviews'>('all');

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'verified': return 'bg-blue-500';
      case 'expert': return 'bg-purple-500';
      case 'top-seller': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'verified': return '✓';
      case 'expert': return '🎓';
      case 'top-seller': return '⭐';
      default: return '';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleVote = (commentId: string, voteType: 'up' | 'down') => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const currentVote = comment.userVote;
        let newLikes = comment.likes;
        let newDislikes = comment.dislikes;
        let newUserVote: 'up' | 'down' | undefined = voteType;

        // Remove previous vote
        if (currentVote === 'up') newLikes--;
        if (currentVote === 'down') newDislikes--;

        // Add new vote or remove if same
        if (currentVote === voteType) {
          newUserVote = undefined;
        } else {
          if (voteType === 'up') newLikes++;
          if (voteType === 'down') newDislikes++;
        }

        return {
          ...comment,
          likes: newLikes,
          dislikes: newDislikes,
          userVote: newUserVote
        };
      }
      return comment;
    }));
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        reputation: 420
      },
      content: newComment,
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      replies: [],
      isHelpful: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        reputation: 420
      },
      content: replyText,
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      replies: [],
      isHelpful: false
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    }));

    setReplyText('');
    setReplyingTo(null);
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp - a.timestamp;
      case 'oldest':
        return a.timestamp - b.timestamp;
      case 'helpful':
        return (b.isHelpful ? 1 : 0) - (a.isHelpful ? 1 : 0) || b.likes - a.likes;
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} />
                <div>
                  <h2 className="text-xl font-bold">Discussion</h2>
                  <p className="text-green-100 text-sm">{templateTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col h-[calc(90vh-120px)]">
            {/* Filters and Sort */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-500" />
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value as any)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Comments</option>
                      <option value="questions">Questions</option>
                      <option value="reviews">Reviews</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <SortDesc size={16} className="text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="helpful">Most Helpful</option>
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {comments.length} comments
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sortedComments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  className="bg-gray-50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Comment Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{comment.author.name}</span>
                          {comment.author.badge && (
                            <div className={`w-5 h-5 ${getBadgeColor(comment.author.badge)} rounded-full flex items-center justify-center text-white text-xs`}>
                              {getBadgeIcon(comment.author.badge)}
                            </div>
                          )}
                          {comment.isHelpful && (
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              <Award size={12} />
                              Helpful
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{comment.author.reputation} reputation</span>
                          <span>•</span>
                          <span>{formatTimeAgo(comment.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-700 mb-4">{comment.content}</p>

                  {/* Comment Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVote(comment.id, 'up')}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                            comment.userVote === 'up'
                              ? 'bg-green-100 text-green-600'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <ThumbsUp size={14} />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => handleVote(comment.id, 'down')}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                            comment.userVote === 'down'
                              ? 'bg-red-100 text-red-600'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <ThumbsDown size={14} />
                          <span className="text-sm">{comment.dislikes}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
                      >
                        <Reply size={14} />
                        Reply
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Heart size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Bookmark size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-500">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <motion.div
                      className="mt-4 p-3 bg-white rounded-lg border"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Reply
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-white rounded-lg p-3 border-l-2 border-green-200">
                          <div className="flex items-start gap-3 mb-2">
                            <img
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-800 text-sm">{reply.author.name}</span>
                                {reply.author.badge && (
                                  <div className={`w-4 h-4 ${getBadgeColor(reply.author.badge)} rounded-full flex items-center justify-center text-white text-xs`}>
                                    {getBadgeIcon(reply.author.badge)}
                                  </div>
                                )}
                                <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* New Comment Form */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3">
                <img
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts, ask questions, or provide feedback..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">
                      Be respectful and constructive in your feedback
                    </div>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={16} />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};