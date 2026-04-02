import React, { useState } from 'react';
import { X, Settings, Key, Monitor, Cpu, Bot, Check, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export type SettingsData = {
    openaiKey: string;
    geminiKey: string;
    snapToGrid: boolean;
    showGrid: boolean;
};

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: SettingsData;
    onUpdate: (settings: SettingsData) => void;
}

type Tab = 'providers' | 'canvas';

export function SettingsModal({ isOpen, onClose, settings, onUpdate }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('providers');

    if (!isOpen) return null;

    const handleChange = (key: keyof SettingsData, value: string | boolean) => {
        onUpdate({ ...settings, [key]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px] animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Sidebar Tabs */}
                <div className="w-full md:w-56 bg-zinc-950/50 border-r border-zinc-800 p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-2 py-3 mb-2">
                        <Settings className="w-5 h-5 text-indigo-400" />
                        <span className="font-semibold text-zinc-100">Settings</span>
                    </div>

                    <button
                        onClick={() => setActiveTab('providers')}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            activeTab === 'providers' ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                        )}
                    >
                        <Key className="w-4 h-4" />
                        Model Providers
                    </button>

                    <button
                        onClick={() => setActiveTab('canvas')}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            activeTab === 'canvas' ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                        )}
                    >
                        <Monitor className="w-4 h-4" />
                        Canvas Settings
                    </button>

                    <div className="mt-auto p-2 text-[10px] text-zinc-600 flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        Keys are stored locally in your browser.
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between p-4 border-bottom border-zinc-800">
                        <h2 className="text-lg font-medium text-zinc-100 capitalize">
                            {activeTab === 'providers' ? 'AI Model Providers' : 'Canvas Interaction'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'providers' && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 group">
                                        <div className="w-6 h-6 rounded flex items-center justify-center bg-zinc-800 text-zinc-400">
                                            <Cpu className="w-4 h-4" />
                                        </div>
                                        OpenAI API Key
                                    </div>
                                    <input
                                        type="password"
                                        value={settings.openaiKey}
                                        onChange={(e) => handleChange('openaiKey', e.target.value)}
                                        placeholder="sk-..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder:text-zinc-700"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 group">
                                        <div className="w-6 h-6 rounded flex items-center justify-center bg-zinc-800 text-zinc-400">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        Gemini API Key
                                    </div>
                                    <input
                                        type="password"
                                        value={settings.geminiKey}
                                        onChange={(e) => handleChange('geminiKey', e.target.value)}
                                        placeholder="AIza..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'canvas' && (
                            <div className="space-y-4">
                                <div
                                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/30 border border-zinc-800/50 cursor-pointer hover:bg-zinc-800/20 transition-colors"
                                    onClick={() => handleChange('snapToGrid', !settings.snapToGrid)}
                                >
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium text-zinc-100">Snap to Grid</div>
                                        <div className="text-xs text-zinc-500">Automatically align nodes to the 24px grid</div>
                                    </div>
                                    <div className={cn(
                                        "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
                                        settings.snapToGrid ? "bg-indigo-600" : "bg-zinc-700"
                                    )}>
                                        <div className={cn(
                                            "w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                                            settings.snapToGrid ? "translate-x-5" : "translate-x-0"
                                        )} />
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/30 border border-zinc-800/50 cursor-pointer hover:bg-zinc-800/20 transition-colors"
                                    onClick={() => handleChange('showGrid', !settings.showGrid)}
                                >
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium text-zinc-100">Grid Visibility</div>
                                        <div className="text-xs text-zinc-500">Show dotted background pattern</div>
                                    </div>
                                    <div className={cn(
                                        "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
                                        settings.showGrid ? "bg-indigo-600" : "bg-zinc-700"
                                    )}>
                                        <div className={cn(
                                            "w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                                            settings.showGrid ? "translate-x-5" : "translate-x-0"
                                        )} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-zinc-800 text-right">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
