import React, { useEffect, useState } from 'react';

export default function UserAvatar({
  name,
  avatarUrl,
  sizeClass = 'w-8 h-8',
  fallbackClass = 'bg-gray-200 text-gray-800',
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [avatarUrl]);

  if (avatarUrl && !failed) {
    return (
      <img
        src={avatarUrl}
        alt={name || 'Avatar'}
        onError={() => setFailed(true)}
        className={`${sizeClass} rounded-full object-cover border border-black/10 bg-gray-100 shrink-0`}
      />
    );
  }

  const parts = (name || 'H').trim().split(/\s+/);
  const initial = (parts[parts.length - 1]?.[0] || 'H').toUpperCase();
  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${fallbackClass}`}>
      {initial}
    </div>
  );
}
