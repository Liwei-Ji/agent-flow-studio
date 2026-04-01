import { memo } from 'react';
import { NodeProps, NodeResizer, Node } from '@xyflow/react';
import { FolderOpen } from 'lucide-react';
import { BaseNodeData } from './Agent';

export const Group = memo(({ data, selected }: NodeProps<Node<BaseNodeData>>) => {
  return (
    <>
      <NodeResizer 
        color="#71717a" 
        isVisible={selected} 
        minWidth={200} 
        minHeight={150} 
      />
      <div className="w-full h-full relative">
        <div className="absolute top-2 left-2 flex items-center gap-2 text-zinc-400 bg-zinc-900/80 px-2 py-1 rounded-md border border-zinc-700/50 backdrop-blur-sm">
          <FolderOpen className="w-4 h-4" />
          <span className="text-xs font-medium">{data.label || 'Group'}</span>
        </div>
        {data.description && (
          <div className="absolute bottom-2 left-2 right-2 text-xs text-zinc-500 truncate" title={data.description}>
            {data.description}
          </div>
        )}
      </div>
    </>
  );
});
