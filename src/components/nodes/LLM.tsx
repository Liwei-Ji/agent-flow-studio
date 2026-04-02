import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Cpu, CheckCircle2, CircleDashed, Loader2, AlertCircle } from 'lucide-react';
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
      return 'border-zinc-700 bg-zinc-800 text-zinc-300';
    case 'running':
      return 'border-blue-500 bg-zinc-800 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    case 'completed':
      return 'border-emerald-500 bg-zinc-800 text-emerald-100';
    case 'error':
      return 'border-rose-500 bg-zinc-800 text-rose-100 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    default:
      return 'border-zinc-700 bg-zinc-800 text-zinc-300';
  }
};

export function LLM({ data, selected }: NodeProps<Node<BaseNodeData>>) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-2 w-[140px] h-[140px] rounded-full border-2 transition-transform duration-200',
        getStatusStyles(data.status),
        selected ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-zinc-900' : 'hover:shadow-lg hover:shadow-purple-500/20'
      )}
    >
      <Handle type="target" position={Position.Left} className="w-5 h-5 bg-zinc-400 border-2 border-zinc-800 hover:scale-125 hover:bg-purple-400 transition-transform" />

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

      <div className="flex items-center justify-center text-purple-400">
        <Cpu className="w-8 h-8" />
      </div>

      <div className="text-center px-2">
        <div className="text-sm font-medium truncate w-full">{data.label}</div>
        <div className="text-xs opacity-70">LLM</div>
      </div>

      {data.description && (
        <div className="text-[10px] text-zinc-400 truncate w-[100px] text-center" title={data.description}>
          {data.description}
        </div>
      )}

      <div className="absolute top-2 right-4">
        <StatusIcon status={data.status} />
      </div>

      <Handle type="source" position={Position.Right} className="w-5 h-5 bg-zinc-400 border-2 border-zinc-800 hover:scale-125 hover:bg-purple-400 transition-transform" />
    </div>
  );
}
