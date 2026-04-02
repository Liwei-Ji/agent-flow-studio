import React from 'react';
import {
    Upload,
    Download,
    LayoutGrid,
    Trash2,
    Plus,
    MousePointer2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ToolbarProps {
    onImport: () => void;
    onExport: () => void;
    onOpenTemplates: () => void;
    onClear: () => void;
    onAddNode?: () => void; // Optional: Toggle sidebar or open a quick-add menu
}

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
    <div className="group relative flex flex-col items-center">
        {children}
        <div className="absolute bottom-full mb-3 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-medium text-zinc-200 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-b border-r border-zinc-700 rotate-45"></div>
        </div>
    </div>
);

export function Toolbar({ onImport, onExport, onOpenTemplates, onClear }: ToolbarProps) {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 p-1.5 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

                {/* Selection Tools Section */}
                <div className="flex items-center gap-1 pr-2 mr-2 border-r border-zinc-800">
                    <Tooltip text="Select Mode">
                        <button className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all">
                            <MousePointer2 className="w-5 h-5" />
                        </button>
                    </Tooltip>
                </div>

                {/* Workflow Actions Section */}
                <div className="flex items-center gap-1">
                    <Tooltip text="Template">
                        <button
                            onClick={onOpenTemplates}
                            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </Tooltip>

                    <Tooltip text="Import">
                        <button
                            onClick={onImport}
                            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            <Upload className="w-5 h-5" />
                        </button>
                    </Tooltip>

                    <Tooltip text="Export">
                        <button
                            onClick={onExport}
                            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </Tooltip>
                </div>

                {/* Danger Section */}
                <div className="flex items-center gap-1 pl-2 ml-2 border-l border-zinc-800">
                    <Tooltip text="Clear">
                        <button
                            onClick={onClear}
                            className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
