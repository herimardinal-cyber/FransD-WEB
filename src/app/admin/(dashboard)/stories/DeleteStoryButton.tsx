'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteStoryButton({
  storyId,
  storyTitle,
}: {
  storyId: string;
  storyTitle: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete story "${storyTitle}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/stories/${storyId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete story');
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting story');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      title="Delete story"
      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50"
    >
      {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
    </button>
  );
}
