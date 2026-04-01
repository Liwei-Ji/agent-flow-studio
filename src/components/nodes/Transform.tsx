import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Code2, CheckCircle2, CircleDashed, Loader2, AlertCircle } from 'lucide-react';
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

export function Transform({ data, selected }: NodeProps<Node<BaseNodeData>>) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 px-4 py-3 min-w-[180px] rounded-xl border-2 transition-transform duration-200',
        getStatusStyles(data.status),
        selected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-900' : 'hover:shadow-lg hover:shadow-indigo-500/20'
      )}
    >
      <Handle type="target" position={Position.Left} className="w-4 h-4 bg-zinc-400 border-2 border-zinc-800 hover:scale-125 hover:bg-indigo-400 transition-transform" />
      
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-700/50 text-cyan-400">
          <Code2 className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium">{data.label}</div>
          <div className="text-xs opacity-70">Transform</div>
        </div>
        
        <StatusIcon status={data.status} />
      </div>

      {data.description && (
        <div className="text-xs text-zinc-400 mt-1 truncate max-w-[150px]" title={data.description}>
          {data.description}
        </div>
      )}
      
      <Handle type="source" position={Position.Right} className="w-4 h-4 bg-zinc-400 border-2 border-zinc-800 hover:scale-125 hover:bg-indigo-400 transition-transform" />
    </div>
  );
}
