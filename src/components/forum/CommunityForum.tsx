import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  ThumbsUp, 
  MessageCircle, 
  Filter, 
  Tag, 
  ShieldAlert, 
  User,
  Plus
} from 'lucide-react';
import { ForumPost, UserProfile, TrackType } from '../../types';
import { Storage } from '../../utils/storage';

interface CommunityForumProps {
  user: UserProfile;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ user }) => {
  const [posts, setPosts] = useState<ForumPost[]>(() => Storage.getForumPosts());
  const [filterTrack, setFilterTrack] = useState<TrackType | 'all'>('all');
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('ElevenLabs, Dubai, Voice');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      track: user.track,
      useCaseId: user.selectedUseCaseId,
      authorName: user.teamLeadName || 'Participant',
      authorStartup: user.startupName || 'Startup Team',
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      likes: 1,
      repliesCount: 0
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    Storage.saveForumPosts(updated);

    setNewTitle('');
    setNewContent('');
    setIsPosting(false);
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    setPosts(updated);
    Storage.saveForumPosts(updated);
  };

  const filteredPosts = posts.filter(
    (p) => filterTrack === 'all' || p.track === filterTrack || p.track === 'all'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Forum Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                PUBLIC COLLABORATION ONLY
              </span>
              <span className="text-xs font-mono text-slate-400">
                Rule: No external private sharing
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Challenge Community & Knowledge Exchange
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Discuss ElevenLabs conversational voice engineering, Arabic dialect tuning, tool scoping, and competition guidelines openly.
            </p>
          </div>

          <button
            onClick={() => setIsPosting(!isPosting)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-950/40 transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>New Public Thread</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setFilterTrack('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterTrack === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Tracks ({posts.length})
          </button>
          <button
            onClick={() => setFilterTrack('track_1')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterTrack === 'track_1'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Track 1: Banking & Insurance
          </button>
          <button
            onClick={() => setFilterTrack('track_2')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterTrack === 'track_2'
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Track 2: Government Services
          </button>
        </div>
      </div>

      {/* New Thread Form */}
      {isPosting && (
        <form onSubmit={handleCreatePost} className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4 animate-in fade-in">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Publish Public Question or Tip</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Title / Topic *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. How to optimize sub-second audio turnaround in Arabic Scribe v2..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Post Content *
            </label>
            <textarea
              rows={3}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share details, code snippets, or prompt techniques..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-500 font-sans resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="Scribe v2, STT, Arabic, Guardrails"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Publish Thread
            </button>
          </div>
        </form>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">
                    {post.authorName} <span className="text-slate-500 font-normal">({post.authorStartup})</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                post.track === 'track_1' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30' :
                post.track === 'track_2' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                'bg-slate-800 text-slate-400'
              }`}>
                {post.track === 'track_1' ? 'Track 1: Banking' : post.track === 'track_2' ? 'Track 2: Gov' : 'All Tracks'}
              </span>
            </div>

            <h3 className="font-display font-bold text-base text-white">
              {post.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {post.content}
            </p>

            {/* Tags & Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 text-xs font-semibold border border-slate-800 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{post.repliesCount} replies</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
