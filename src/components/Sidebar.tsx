import { DragEvent } from 'react';
import {
  Bot, Cpu, Zap, Blocks, Database, Wrench, FolderOpen,
  ChevronLeft, ChevronRight, Play, Flag, StickyNote,
  GitBranch, Code2, Repeat, Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}

export function Sidebar({ isOpen, onToggle, onOpenSettings }: SidebarProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const components = [
    { type: 'Input', label: 'Input', desc: 'Workflow starting point', icon: Play, color: 'bg-emerald-500/20 text-emerald-400' },
    { type: 'Output', label: 'Output', desc: 'Workflow end result', icon: Flag, color: 'bg-rose-500/20 text-rose-400' },
    { type: 'agent', label: 'Agent', desc: 'Autonomous entity', icon: Bot, color: 'bg-indigo-500/20 text-indigo-400' },
    { type: 'llm', label: 'LLM', desc: 'Language model', icon: Cpu, color: 'bg-purple-500/20 text-purple-400', rounded: true },
    { type: 'skill', label: 'Skill', desc: 'Specific capability', icon: Zap, color: 'bg-amber-500/20 text-amber-400' },
    { type: 'rag', label: 'RAG', desc: 'Retrieval-Augmented Gen', icon: Database, color: 'bg-teal-500/20 text-teal-400' },
    { type: 'tool', label: 'Tool / Action', desc: 'External tool execution', icon: Wrench, color: 'bg-zinc-500/20 text-zinc-300' },
    { type: 'mcp', label: 'MCP', desc: 'Model Context Protocol', icon: Blocks, color: 'bg-orange-500/20 text-orange-400', isHex: true },
    { type: 'condition', label: 'Condition', desc: 'Router / If-Else logic', icon: GitBranch, color: 'bg-pink-500/20 text-pink-400' },
    { type: 'transform', label: 'Transform', desc: 'Data mapping / Code', icon: Code2, color: 'bg-cyan-500/20 text-cyan-400' },
    { type: 'loop', label: 'Loop', desc: 'Retry / Iteration logic', icon: Repeat, color: 'bg-orange-500/20 text-orange-400' },
    { type: 'group', label: 'Group', desc: 'Sub-workflow container', icon: FolderOpen, color: 'bg-zinc-500/20 text-zinc-400' },
    { type: 'note', label: 'Note', desc: 'Sticky note for canvas', icon: StickyNote, color: 'bg-yellow-500/20 text-yellow-400' },
  ];

  return (
    <div className={cn("absolute top-4 left-4 h-[calc(100vh-2rem)] transition-all duration-300 ease-in-out z-20 pointer-events-none", isOpen ? "w-64" : "w-0")}>
      <aside className={cn(
        "absolute top-0 left-0 h-full w-64 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out pointer-events-auto",
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
      )}>
        <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Components
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {components.map((comp) => (
            <div
              key={comp.type}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 cursor-grab hover:bg-zinc-700/50 transition-colors group"
              onDragStart={(event) => onDragStart(event, comp.type)}
              draggable
            >
              <div className={cn(
                "w-8 h-8 flex items-center justify-center shrink-0",
                comp.rounded ? "rounded-full" : "rounded-md",
                comp.color
              )} style={comp.isHex ? { clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" } : {}}>
                <comp.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-zinc-200 truncate">{comp.label}</div>
                <div className="text-[10px] text-zinc-500 truncate">{comp.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Button - Bottom Fixed */}
        <div className="pt-2 border-t border-zinc-800">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-zinc-800/80 border border-zinc-700/50 hover:bg-zinc-700 transition-colors group"
          >
            <div className="w-8 h-8 rounded-md bg-zinc-700/50 text-zinc-400 group-hover:text-indigo-400 flex items-center justify-center transition-colors">
              <Settings className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-zinc-200">Settings</div>
              <div className="text-[10px] text-zinc-500">Configure Flow Studio</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute top-6 w-10 h-10 bg-zinc-800/90 backdrop-blur-md border border-zinc-700 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer shadow-lg z-20 pointer-events-auto",
          isOpen ? "-right-5" : "left-0"
        )}
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}
