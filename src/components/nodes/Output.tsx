import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BaseNodeData } from './Agent';

export function Output({ data, selected }: NodeProps<Node<BaseNodeData>>) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 px-4 py-3 min-w-[180px] rounded-xl border-2 transition-transform duration-200 bg-zinc-800 border-zinc-600 text-zinc-100',
        selected ? 'ring-2 ring-zinc-500 ring-offset-2 ring-offset-zinc-900' : 'hover:shadow-lg hover:shadow-zinc-500/20'
      )}
    >
      <Handle type="target" position={Position.Left} className="w-4 h-4 bg-zinc-400 border-2 border-zinc-800 hover:scale-125 hover:bg-zinc-400 transition-transform" />
      
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-500/20 text-zinc-400">
          <Flag className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs opacity-70">Output</div>
        </div>
      </div>
      
      {data.description && (
        <div className="text-xs text-zinc-400 mt-1 truncate max-w-[150px]" title={data.description}>
          {data.description}
        </div>
      )}
    </div>
  );
}
