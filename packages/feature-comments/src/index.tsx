import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '@taskflow/ui-components';
import { storage, generateId, formatDateTime } from '@taskflow/utils';
import { MessageSquare, Send } from 'lucide-react';

export interface Comment {
  id: string;
  taskId: string;
  text: string;
  timestamp: string;
}

export const CommentSection: React.FC<{ taskId: string }> = ({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const allComments = storage.get<Comment[]>('comments', []);
    setComments(allComments.filter(c => c.taskId === taskId));
  }, [taskId]);

  const addComment = () => {
    if (!text) return;
    const newComment: Comment = {
      id: generateId(),
      taskId,
      text,
      timestamp: new Date().toISOString()
    };
    const allComments = storage.get<Comment[]>('comments', []);
    const updated = [...allComments, newComment];
    storage.set('comments', updated);
    setComments(updated.filter(c => c.taskId === taskId));
    setText('');
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" /> Discussion
      </h4>
      <div className="space-y-4 mb-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold shrink-0">
              U
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-3">
              <p className="text-sm text-gray-800">{comment.text}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">{formatDateTime(comment.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Write a comment..." 
          className="flex-1"
          onKeyDown={e => e.key === 'Enter' && addComment()}
        />
        <Button onClick={addComment} className="shrink-0"><Send className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};
