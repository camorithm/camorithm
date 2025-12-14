'use client';

import React, { useState } from 'react';
import { FileText, Image, Smile, Star, Tag, Calendar, Save, X, Upload } from 'lucide-react';

// Types
interface TradeNote {
  id: string;
  tradeId: string;
  setup: string;
  mood: 'confident' | 'neutral' | 'uncertain' | 'stressed';
  rating: number; // 1-5
  tags: string[];
  screenshots: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EnhancedTradeNotesProps {
  tradeId: string;
  existingNote?: TradeNote;
  onSave?: (note: TradeNote) => void;
  onCancel?: () => void;
}

const moodOptions = [
  { value: 'confident', label: 'Confident', emoji: '😊', color: 'green' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'slate' },
  { value: 'uncertain', label: 'Uncertain', emoji: '😕', color: 'yellow' },
  { value: 'stressed', label: 'Stressed', emoji: '😰', color: 'red' },
] as const;

const setupTemplates = [
  { id: 'breakout', label: 'Breakout', template: '📈 Breakout Setup\n• Key level: \n• Confirmation: \n• Entry: \n• Stop: \n• Target: ' },
  { id: 'reversal', label: 'Reversal', template: '🔄 Reversal Setup\n• Pattern: \n• Support/Resistance: \n• Entry: \n• Stop: \n• Target: ' },
  { id: 'trend', label: 'Trend Follow', template: '📊 Trend Following\n• Trend: \n• Pullback level: \n• Entry: \n• Stop: \n• Target: ' },
  { id: 'scalp', label: 'Scalp', template: '⚡ Scalp Trade\n• Timeframe: \n• Quick entry: \n• Tight stop: \n• Quick target: ' },
];

const commonTags = [
  'Strategy A', 'Strategy B', 'News', 'Breakout', 'Reversal', 
  'Scalp', 'Swing', 'London Open', 'NY Session', 'Impulse', 
  'Patience', 'FOMO', 'Revenge Trade', 'Perfect Setup'
];

export const EnhancedTradeNotes: React.FC<EnhancedTradeNotesProps> = ({
  tradeId,
  existingNote,
  onSave,
  onCancel,
}) => {
  const [note, setNote] = useState<Partial<TradeNote>>(existingNote || {
    id: `note-${Date.now()}`,
    tradeId,
    setup: '',
    mood: 'neutral',
    rating: 3,
    tags: [],
    screenshots: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [showTemplates, setShowTemplates] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const handleSave = () => {
    if (onSave && note.setup) {
      onSave({
        ...note,
        updatedAt: new Date(),
      } as TradeNote);
    }
  };

  const addTag = (tag: string) => {
    if (!note.tags?.includes(tag)) {
      setNote(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
    }
    setShowTagPicker(false);
    setCustomTag('');
  };

  const removeTag = (tag: string) => {
    setNote(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }));
  };

  const applyTemplate = (template: string) => {
    setNote(prev => ({
      ...prev,
      setup: template,
    }));
    setShowTemplates(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In production, upload to cloud storage
    // For demo, create object URLs
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    
    setNote(prev => ({
      ...prev,
      screenshots: [...(prev.screenshots || []), ...urls],
    }));
  };

  const removeScreenshot = (url: string) => {
    setNote(prev => ({
      ...prev,
      screenshots: prev.screenshots?.filter(s => s !== url) || [],
    }));
  };

  return (
    <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Trade Notes</h3>
              <p className="text-xs text-slate-500">Document your setup and analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!note.setup}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              Save Note
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Templates */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Setup Notes
            </label>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {showTemplates ? 'Hide Templates' : 'Use Template'}
            </button>
          </div>

          {showTemplates && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              {setupTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template.template)}
                  className="px-3 py-2 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 transition-all"
                >
                  {template.label}
                </button>
              ))}
            </div>
          )}

          <textarea
            value={note.setup}
            onChange={(e) => setNote(prev => ({ ...prev, setup: e.target.value }))}
            placeholder="Describe your setup, entry reason, and strategy..."
            rows={8}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono resize-none"
          />
        </div>

        {/* Screenshots */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Screenshots
          </label>
          
          {note.screenshots && note.screenshots.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {note.screenshots.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-slate-200 dark:border-white/5"
                  />
                  <button
                    onClick={() => removeScreenshot(url)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer transition-all">
            <Upload size={16} />
            Upload Chart Screenshot
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Tags
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags?.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-lg border border-blue-200 dark:border-blue-500/20"
              >
                <Tag size={10} />
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-500"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          {!showTagPicker ? (
            <button
              onClick={() => setShowTagPicker(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg transition-all"
            >
              <Tag size={12} />
              Add Tag
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder="Custom tag..."
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && customTag) {
                      addTag(customTag);
                    }
                  }}
                />
                {customTag && (
                  <button
                    onClick={() => addTag(customTag)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg"
                  >
                    Add
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowTagPicker(false);
                    setCustomTag('');
                  }}
                  className="px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {commonTags.filter(t => !note.tags?.includes(t)).map(tag => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="px-2 py-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs text-slate-600 dark:text-slate-400 rounded transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mood & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Mood During Trade
            </label>
            <div className="grid grid-cols-2 gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood.value}
                  onClick={() => setNote(prev => ({ ...prev, mood: mood.value }))}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    note.mood === mood.value
                      ? `border-${mood.color}-500 bg-${mood.color}-50 dark:bg-${mood.color}-500/10`
                      : 'border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className={`text-xs font-medium ${
                    note.mood === mood.value
                      ? `text-${mood.color}-700 dark:text-${mood.color}-400`
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Trade Quality Rating
            </label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setNote(prev => ({ ...prev, rating }))}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    size={28}
                    className={
                      rating <= (note.rating || 0)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-slate-300 dark:text-slate-700'
                    }
                  />
                </button>
              ))}
              <div className="ml-auto">
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {note.rating || 0}/5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTradeNotes;