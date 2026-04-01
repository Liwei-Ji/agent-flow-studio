import { useCallback } from 'react';
import { Copy, Trash2, Settings2, History, GitBranch, FolderPlus } from 'lucide-react';

interface ContextMenuProps {
  id?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  isMultiSelection?: boolean;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSettings: (id: string) => void;
  onHistory: (id: string) => void;
  onSetCondition?: (id: string) => void;
  onGroupSelected?: () => void;
  onClose: () => void;
}

export function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  isMultiSelection,
  onDuplicate,
  onDelete,
  onSettings,
  onHistory,
  onSetCondition,
  onGroupSelected,
  onClose,
}: ContextMenuProps) {
  const duplicate = useCallback(() => {
    if (id) onDuplicate(id);
    onClose();
  }, [id, onDuplicate, onClose]);

  const deleteNode = useCallback(() => {
    if (id) onDelete(id);
    onClose();
  }, [id, onDelete, onClose]);

  const settings = useCallback(() => {
    if (id) onSettings(id);
    onClose();
  }, [id, onSettings, onClose]);

  const history = useCallback(() => {
    if (id) onHistory(id);
    onClose();
  }, [id, onHistory, onClose]);

  const setCondition = useCallback(() => {
    if (id && onSetCondition) onSetCondition(id);
    onClose();
  }, [id, onSetCondition, onClose]);

  const groupSelected = useCallback(() => {
    if (onGroupSelected) onGroupSelected();
    onClose();
  }, [onGroupSelected, onClose]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-50 min-w-[180px] bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 text-sm text-zinc-300"
    >
      {isMultiSelection ? (
        <button
          onClick={groupSelected}
          className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          Group Selected
        </button>
      ) : (
        <>
          <button
            onClick={settings}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={setCondition}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 transition-colors text-indigo-300"
          >
            <GitBranch className="w-4 h-4" />
            Set Condition
          </button>
          <button
            onClick={duplicate}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <button
            onClick={history}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 flex items-center gap-2 transition-colors"
          >
            <History className="w-4 h-4" />
            View History
          </button>
          <div className="h-px bg-zinc-700 my-1" />
          <button
            onClick={deleteNode}
            className="w-full text-left px-4 py-2 hover:bg-rose-500/20 text-rose-400 flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </>
      )}
    </div>
  );
}
