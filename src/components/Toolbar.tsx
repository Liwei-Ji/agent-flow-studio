import React from 'react';
import {
    Upload,
    Download,
    LayoutGrid,
    Trash2,
    Play,
    Square,
    MousePointer2,
    Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ToolbarProps {
    onImport: () => void;
    onExport: () => void;
    onOpenTemplates: () => void;
    onClear: () => void;
    isRuntimeMode: boolean;
    onToggleRuntime: () => void;
    onOpenSettings: () => void;
    onAddNode?: () => void;
}

export const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
    <div className="group relative flex flex-col items-center">
        {children}
        <div className="absolute bottom-full mb-3 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-medium text-zinc-200 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-b border-r border-zinc-700 rotate-45"></div>
        </div>
    </div>
);

export function Toolbar({
    onImport,
    onExport,
    onOpenTemplates,
    onClear,
    isRuntimeMode,
    onToggleRuntime,
    onOpenSettings
}: ToolbarProps) {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500">
            <div className={cn(
                "flex items-center gap-1 p-1.5 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500",
                isRuntimeMode ? "bg-indigo-600/20 border-indigo-500/30 px-4" : "bg-zinc-900/80"
            )}>

                {/* Selection Tools Section - Includes Runtime Control */}
                <div className="flex items-center gap-1 transition-all">
                    <Tooltip text="Select Mode">
                        <button className="p-2 rounded-xl text-indigo-400 hover:bg-indigo-500/10 bg-indigo-500/5 transition-all">
                            <MousePointer2 className="w-5 h-5" />
                        </button>
                    </Tooltip>

                    <Tooltip text={isRuntimeMode ? "Stop" : "Run"}>
                        <button
                            onClick={onToggleRuntime}
                            className={cn(
                                "p-2 rounded-xl transition-all active:scale-95 ml-1",
                                isRuntimeMode
                                    ? "text-red-500 hover:bg-red-500/10 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                                    : "text-emerald-400 hover:bg-emerald-500/10 bg-emerald-500/5 hover:text-emerald-300"
                            )}
                        >
                            {isRuntimeMode ? (
                                <Square className="w-5 h-5 fill-red-500/20" />
                            ) : (
                                <Play className="w-5 h-5 fill-emerald-500/20" />
                            )}
                        </button>
                    </Tooltip>

                    <Tooltip text="Settings">
                        <button
                            onClick={onOpenSettings}
                            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all ml-1"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </Tooltip>
                </div>

                {/* Workflow Actions Section - Modified in Runtime */}
                {!isRuntimeMode ? (
                    <div className="flex items-center gap-1 transition-all">
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
                ) : null}

                {/* Danger Section - Hidden in Runtime */}
                {!isRuntimeMode && (
                    <div className="flex items-center gap-1 pl-2 ml-2 border-l border-zinc-800 transition-all">
                        <Tooltip text="Clear">
                            <button
                                onClick={onClear}
                                className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
}
