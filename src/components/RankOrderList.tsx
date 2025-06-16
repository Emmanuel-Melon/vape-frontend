import React from 'react';

export interface RankOption {
  id: string; // Corresponds to option.value
  content: string; // Corresponds to option.label
  disabled?: boolean;
}

// This will likely need to be an array of objects if we store more than just the value/id, e.g., { optionValue: string, rank: number }
// For now, let's assume it's an array of option IDs in their ranked order.
export type RankedItemValue = string;

interface RankOrderListProps {
  options: RankOption[];
  rankedItems: RankedItemValue[]; // Array of option IDs in their current ranked order
  onChange: (newRankedItems: RankedItemValue[]) => void;
  name?: string;
  className?: string;
  itemClassName?: string;
}

// Basic placeholder implementation. Drag-and-drop functionality will be more complex.
export const RankOrderList: React.FC<RankOrderListProps> = ({
  options,
  rankedItems, // Current order of item IDs
  onChange,
  name,
  className = 'space-y-2',
  itemClassName = 'p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 cursor-grab',
}) => {
  // Ensure all options are represented in rankedItems, maintaining existing order and appending new ones.
  // This is a simplified approach. A real DND list would handle this more robustly.
  const displayItems = [...options];
  displayItems.sort((a, b) => {
    const indexA = rankedItems.indexOf(a.id);
    const indexB = rankedItems.indexOf(b.id);
    if (indexA === -1 && indexB === -1) return 0; // Keep original relative order if both not ranked
    if (indexA === -1) return 1; // Unranked items go to the bottom
    if (indexB === -1) return -1; // Unranked items go to the bottom
    return indexA - indexB; // Sort by current rank
  });

  // For this placeholder, clicking an item could move it to the top as a mock reorder.
  const handleMockReorder = (itemId: string) => {
    const currentOrder = displayItems.map(opt => opt.id);
    const newOrder = [itemId, ...currentOrder.filter(id => id !== itemId)];
    onChange(newOrder);
  };

  return (
    <div className={className} role="listbox" aria-label={name || 'Rank order list'}>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Click an item to move it to the top (placeholder for drag & drop).
      </p>
      {displayItems.map((option, index) => (
        <div
          key={option.id}
          className={itemClassName}
          onClick={() => !option.disabled && handleMockReorder(option.id)}
          aria-label={`${option.content} - current rank ${index + 1}`}
          tabIndex={option.disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              !option.disabled && handleMockReorder(option.id);
            }
          }}
        >
          <span className="font-medium">{index + 1}. </span>{option.content}
          {option.disabled && <span className="text-xs text-gray-400 ml-2">(Disabled)</span>}
        </div>
      ))}
    </div>
  );
};
