'use client';

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
}

export default function TagBadge({ tag, active, onClick }: TagBadgeProps) {
  return (
    <button
      type="button"
      className={`badge ${active ? 'badge-primary' : 'badge-outline'} badge-sm cursor-pointer`}
      onClick={() => onClick?.(tag)}
    >
      {tag}
    </button>
  );
}
