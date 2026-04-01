import { DragEvent } from 'react';
import { Bot, Cpu, Zap, Blocks, Database, Wrench, FolderOpen, ChevronLeft, ChevronRight, Play, Flag, StickyNote, GitBranch, Code2, Repeat } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={cn("absolute top-4 left-4 h-[calc(100vh-2rem)] transition-all duration-300 ease-in-out z-20 pointer-events-none", isOpen ? "w-64" : "w-0")}>
      <aside className={cn(
        "absolute top-0 left-0 h-full w-64 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ease-in-out pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
      )}>
        <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Components
        </div>
        
        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'Input')}
          draggable
        >
          <div className="w-8 h-8 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Input</div>
            <div className="text-xs text-zinc-500">Workflow starting point</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'Output')}
          draggable
        >
          <div className="w-8 h-8 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Output</div>
            <div className="text-xs text-zinc-500">Workflow end result</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'agent')}
          draggable
        >
          <div className="w-8 h-8 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Agent</div>
            <div className="text-xs text-zinc-500">Autonomous entity</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'llm')}
          draggable
        >
          <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">LLM</div>
            <div className="text-xs text-zinc-500">Language model</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'skill')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Skill</div>
            <div className="text-xs text-zinc-500">Specific capability</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'rag')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">RAG</div>
            <div className="text-xs text-zinc-500">Retrieval-Augmented Gen</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'tool')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-500/20 text-zinc-300 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Tool / Action</div>
            <div className="text-xs text-zinc-500">External tool execution</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'mcp')}
          draggable
        >
          <div className="w-8 h-8 bg-orange-500/20 text-orange-400 flex items-center justify-center" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}>
            <Blocks className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">MCP</div>
            <div className="text-xs text-zinc-500">Model Context Protocol</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'condition')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Condition</div>
            <div className="text-xs text-zinc-500">Router / If-Else logic</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'transform')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Transform</div>
            <div className="text-xs text-zinc-500">Data mapping / Code</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'loop')}
          draggable
        >
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Loop</div>
            <div className="text-xs text-zinc-500">Retry / Iteration logic</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'group')}
          draggable
        >
          <div className="w-8 h-8 rounded-md bg-zinc-500/20 text-zinc-400 flex items-center justify-center">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Group</div>
            <div className="text-xs text-zinc-500">Sub-workflow container</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 cursor-grab hover:bg-zinc-700/50 transition-colors"
          onDragStart={(event) => onDragStart(event, 'note')}
          draggable
        >
          <div className="w-8 h-8 rounded-md bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
            <StickyNote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">Note</div>
            <div className="text-xs text-zinc-500">Sticky note for canvas</div>
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute top-6 w-10 h-10 bg-zinc-800/90 backdrop-blur-md border border-zinc-700 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer shadow-lg z-20 pointer-events-auto",
          isOpen ? "-right-5" : "left-0"
        )}
        title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}
