import React, { useState, useEffect } from 'react';
import { Card, Button } from '@taskflow/ui-components';
import { storage, generateId } from '@taskflow/utils';
import { Paperclip, File, X, UploadCloud } from 'lucide-react';

export interface Attachment {
  id: string;
  name: string;
}

export const AttachmentUploader: React.FC = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    setAttachments(storage.get<Attachment[]>('attachments', []));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const news: Attachment[] = Array.from(files).map(f => ({
      id: generateId(),
      name: f.name
    }));
    
    const updated = [...news, ...attachments];
    setAttachments(updated);
    storage.set('attachments', updated);
  };

  const removeAt = (id: string) => {
    const updated = attachments.filter(a => a.id !== id);
    setAttachments(updated);
    storage.set('attachments', updated);
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <input 
          type="file" 
          multiple 
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center group-hover:border-indigo-300 group-hover:bg-indigo-50/30 transition-all">
          <UploadCloud className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-indigo-400 group-hover:scale-110 transition-transform" />
          <p className="text-gray-600 font-medium">Click or drag files here to upload</p>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Supports all common formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {attachments.map(at => (
          <Card key={at.id} className="p-3 flex items-center justify-between group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <File className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">{at.name}</span>
            </div>
            <button onClick={() => removeAt(at.id)} className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
              <X className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};
