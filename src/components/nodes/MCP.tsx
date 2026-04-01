import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Blocks, CheckCircle2, CircleDashed, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BaseNodeData, NodeStatus } from './Agent';

const StatusIcon = ({ status }: { status: NodeStatus }) => {
  switch (status) {
    case 'pending':
      return <CircleDashed className="w-4 h-4 text-zinc-400" />;
    case 'running':
      return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />;
    default:
      return null;
  }
};

const getStatusStyles = (status: NodeStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-zinc-700 text-zinc-300';
    case 'running':
      return 'bg-blue-500 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    case 'completed':
      return 'bg-emerald-500 text-emerald-100';
    case 'error':
      return 'bg-rose-500 text-rose-100 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    default:
      return 'bg-zinc-700 text-zinc-300';
  }
};

export function MCP({ data, selected }: NodeProps<Node<BaseNodeData>>) {
  // Hexagon clip path
  const hexagonClip = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-[160px] h-[140px] transition-transform duration-200',
        selected ? 'drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]' : 'hover:drop-shadow-[0_0_10px_rgba(234,88,12,0.2)]'
      )}
    >
      {/* Outer border layer */}
      <div 
        className={cn("absolute inset-0", getStatusStyles(data.status))}
        style={{ clipPath: hexagonClip }}
      />
      
      {/* Inner background layer */}
      <div 
        className="absolute inset-[2px] bg-zinc-800 flex flex-col items-center justify-center gap-2"
        style={{ clipPath: hexagonClip }}
      >
        <div className="flex items-center justify-center text-orange-400 mt-2">
          <Blocks className="w-6 h-6" />
        </div>
        
        <div className="text-center px-4">
          <div className="text-sm font-medium truncate w-full">{data.label}</div>
          <div className="text-xs opacity-70">MCP</div>
        </div>
        
        {data.description && (
          <div className="text-[10px] text-zinc-400 truncate w-[100px] text-center" title={data.description}>
            {data.description}
          </div>
        )}
        
        <div className="absolute top-4 right-6">
          <StatusIcon status={data.status} />
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-4 h-4 bg-zinc-400 border-2 border-zinc-800 -ml-2 hover:scale-125 hover:bg-orange-400 transition-transform" />
      
      {/* Retry Input (Top) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        id="loop-return" 
        className="w-4 h-4 bg-orange-500 border-2 border-zinc-800 hover:scale-125 transition-transform group" 
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <span className="text-[10px] font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase whitespace-nowrap">Retry In</span>
        </div>
      </Handle>

      <Handle type="source" position={Position.Right} className="w-4 h-4 bg-zinc-400 border-2 border-zinc-800 -mr-2 hover:scale-125 hover:bg-orange-400 transition-transform" />
    </div>
  );
}
