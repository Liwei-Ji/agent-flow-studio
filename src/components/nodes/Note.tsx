import { memo } from 'react';
import { NodeProps, Node, NodeResizer } from '@xyflow/react';
import { cn } from '../../lib/utils';
import { BaseNodeData } from './Agent';

const colorStyles = {
  yellow: {
    bg: 'bg-yellow-200/90 border-yellow-300',
    ring: 'ring-yellow-500',
    shadow: 'hover:shadow-yellow-500/20',
    corner: 'bg-yellow-300/80 border-yellow-400/50',
    text: 'text-yellow-900 placeholder-yellow-800/40',
    label: 'text-yellow-800/60',
  },
  blue: {
    bg: 'bg-blue-200/90 border-blue-300',
    ring: 'ring-blue-500',
    shadow: 'hover:shadow-blue-500/20',
    corner: 'bg-blue-300/80 border-blue-400/50',
    text: 'text-blue-900 placeholder-blue-800/40',
    label: 'text-blue-800/60',
  },
  green: {
    bg: 'bg-green-200/90 border-green-300',
    ring: 'ring-green-500',
    shadow: 'hover:shadow-green-500/20',
    corner: 'bg-green-300/80 border-green-400/50',
    text: 'text-green-900 placeholder-green-800/40',
    label: 'text-green-800/60',
  },
  pink: {
    bg: 'bg-pink-200/90 border-pink-300',
    ring: 'ring-pink-500',
    shadow: 'hover:shadow-pink-500/20',
    corner: 'bg-pink-300/80 border-pink-400/50',
    text: 'text-pink-900 placeholder-pink-800/40',
    label: 'text-pink-800/60',
  },
  purple: {
    bg: 'bg-purple-200/90 border-purple-300',
    ring: 'ring-purple-500',
    shadow: 'hover:shadow-purple-500/20',
    corner: 'bg-purple-300/80 border-purple-400/50',
    text: 'text-purple-900 placeholder-purple-800/40',
    label: 'text-purple-800/60',
  },
};

export const Note = memo(({ data, selected }: NodeProps<Node<BaseNodeData & { color?: string }>>) => {
  const colorKey = (data.color as keyof typeof colorStyles) || 'yellow';
  const styles = colorStyles[colorKey] || colorStyles.yellow;

  return (
    <>
      <NodeResizer 
        color="#a1a1aa" 
        isVisible={selected} 
        minWidth={200} 
        minHeight={150} 
      />
      <div
        className={cn(
          'relative flex flex-col w-full h-full min-w-[200px] min-h-[150px] rounded-sm shadow-md transition-transform duration-200 border',
          styles.bg,
          selected ? `ring-2 ring-offset-2 ring-offset-zinc-900 ${styles.ring}` : `hover:shadow-lg ${styles.shadow}`
        )}
      >
        {/* Folded corner effect */}
        <div className={cn("absolute top-0 right-0 w-4 h-4 border-b border-l rounded-bl-sm", styles.corner)} />
        
        <div className="flex-1 p-3 flex flex-col h-full">
          {data.label && data.label.trim() !== '' && (
            <div className={cn("text-xs font-semibold uppercase tracking-wider mb-1", styles.label)}>
              {data.label}
            </div>
          )}
          <textarea
            className={cn("w-full h-full flex-1 bg-transparent border-none resize-none text-sm focus:outline-none nodrag", styles.text)}
            placeholder="Type your note here..."
            defaultValue={data.description || ''}
            onChange={(e) => {
              data.description = e.target.value;
            }}
          />
        </div>
      </div>
    </>
  );
});
