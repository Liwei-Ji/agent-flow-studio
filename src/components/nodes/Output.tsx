import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Flag, CheckCircle2, CircleDashed, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BaseNodeData, NodeStatus } from './Agent';

const StatusIcon = ({ status }: { status?: NodeStatus }) => {
  if (!status) return null;
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

const getStatusStyles = (status?: NodeStatus) => {
  if (!status) return 'border-zinc-600 bg-zinc-800 text-zinc-100';
  switch (status) {
    case 'pending':
      return 'border-zinc-700 bg-zinc-800 text-zinc-300';
    case 'running':
      return 'border-blue-500 bg-zinc-800 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.4)]';
    case 'completed':
      return 'border-emerald-500 bg-zinc-800 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    case 'error':
      return 'border-rose-500 bg-zinc-800 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)]';
    default:
      return 'border-zinc-600 bg-zinc-800 text-zinc-100';
  }
};

export function Output({ data, selected }: NodeProps<Node<BaseNodeData>>) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 px-4 py-3 min-w-[180px] rounded-xl border-2 transition-all duration-300',
        getStatusStyles(data.status),
        selected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-900' : 'hover:shadow-lg hover:shadow-zinc-500/10'
      )}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-zinc-600 border-2 border-zinc-800 hover:scale-125 hover:bg-indigo-400 transition-all" />

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-500/10 text-zinc-400">
          <Flag className="w-4 h-4 fill-zinc-400/20" />
        </div>

        <div className="flex-1">
          <div className="text-sm font-semibold tracking-tight">{data.label}</div>
          <div className="text-[10px] uppercase font-bold opacity-40 tracking-wider">Output Result</div>
        </div>

        <StatusIcon status={data.status} />
      </div>

      {data.description && (
        <div className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed" title={data.description}>
          {data.description}
        </div>
      )}
    </div>
  );
}
