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

interface ComponentItem {
  type: string;
  label: string;
  desc: string;
  icon: any;
  color: string;
  rounded?: boolean;
  isHex?: boolean;
}

interface Category {
  name: string;
  items: ComponentItem[];
}

export function Sidebar({ isOpen, onToggle, onOpenSettings }: SidebarProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories: Category[] = [
    {
      name: 'Flow',
      items: [
        { type: 'Input', label: 'Input', desc: 'Starting point', icon: Play, color: 'bg-emerald-500/20 text-emerald-400' },
        { type: 'Output', label: 'Output', desc: 'End result', icon: Flag, color: 'bg-rose-500/20 text-rose-400' },
        { type: 'group', label: 'Group', desc: 'Container', icon: FolderOpen, color: 'bg-zinc-500/20 text-zinc-400' },
        { type: 'note', label: 'Note', desc: 'Sticky note', icon: StickyNote, color: 'bg-yellow-500/20 text-yellow-400' },
      ]
    },
    {
      name: 'Intelligence',
      items: [
        { type: 'agent', label: 'Agent', desc: 'Autonomous entity', icon: Bot, color: 'bg-indigo-500/20 text-indigo-400' },
        { type: 'llm', label: 'LLM', desc: 'Language model', icon: Cpu, color: 'bg-purple-500/20 text-purple-400', rounded: true },
        { type: 'rag', label: 'RAG', desc: 'Knowledge retrieval', icon: Database, color: 'bg-teal-500/20 text-teal-400' },
      ]
    },
    {
      name: 'Logic',
      items: [
        { type: 'condition', label: 'Condition', desc: 'If-Else logic', icon: GitBranch, color: 'bg-pink-500/20 text-pink-400' },
        { type: 'loop', label: 'Loop', desc: 'Retry / Iteration', icon: Repeat, color: 'bg-orange-500/20 text-orange-400' },
        { type: 'transform', label: 'Transform', desc: 'Data mapping', icon: Code2, color: 'bg-cyan-500/20 text-cyan-400' },
      ]
    },
    {
      name: 'Tools',
      items: [
        { type: 'tool', label: 'Tool / Action', desc: 'External execution', icon: Wrench, color: 'bg-zinc-500/20 text-zinc-300' },
        { type: 'mcp', label: 'MCP', desc: 'Model Context Protocol', icon: Blocks, color: 'bg-orange-500/20 text-orange-400', isHex: true },
        { type: 'skill', label: 'Skill', desc: 'Specific capability', icon: Zap, color: 'bg-amber-500/20 text-amber-400' },
      ]
    }
  ];

  return (
    <div className={cn("absolute top-4 left-4 h-[calc(100vh-2rem)] transition-all duration-300 ease-in-out z-20 pointer-events-none", isOpen ? "w-64" : "w-0")}>
      <aside className={cn(
        "absolute top-0 left-0 h-full w-64 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out pointer-events-auto",
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0"
      )}>
        <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {cat.name}
                </div>
                <div className="space-y-1.5">
                  {cat.items.map((comp) => (
                    <div
                      key={comp.type}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-700/30 cursor-grab hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-all group active:scale-95"
                      onDragStart={(event) => onDragStart(event, comp.type)}
                      draggable
                    >
                      <div className={cn(
                        "w-7 h-7 flex items-center justify-center shrink-0 shadow-sm",
                        comp.rounded ? "rounded-full" : "rounded-lg",
                        comp.color
                      )} style={comp.isHex ? { clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" } : {}}>
                        <comp.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-zinc-200 truncate">{comp.label}</div>
                        <div className="text-[10px] text-zinc-500 truncate leading-tight">{comp.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}
