import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutGrid, Check, Sparkles, BookOpen, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { TEMPLATES, WorkflowTemplate } from '../lib/templates';

interface TemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: WorkflowTemplate) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Knowledge': return <BookOpen className="w-4 h-4 text-emerald-400" />;
        case 'Agentic': return <Bot className="w-4 h-4 text-indigo-400" />;
        case 'Creative': return <Sparkles className="w-4 h-4 text-purple-400" />;
        default: return <LayoutGrid className="w-4 h-4 text-zinc-400" />;
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    }
};

export function TemplateModal({ isOpen, onClose, onSelect }: TemplateModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-900/90 backdrop-blur-2xl border border-zinc-700/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 border-b border-zinc-800/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-500/10 rounded-2xl shadow-inner">
                                    <LayoutGrid className="w-7 h-7 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">Workflow Registry</h2>
                                    <p className="text-sm text-zinc-500 font-medium">Select a blueprint to begin your architecture</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all active:scale-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Gallery Grid */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 overflow-y-auto p-8 scrollbar-hide"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {TEMPLATES.map((template) => (
                                    <motion.button
                                        key={template.id}
                                        variants={itemVariants}
                                        onClick={() => onSelect(template)}
                                        className="group flex flex-col text-left bg-zinc-800/40 border border-zinc-700/30 rounded-3xl overflow-hidden hover:bg-zinc-800/80 hover:border-indigo-500/50 transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        {/* Visual Preview Placeholder */}
                                        <div className="h-40 bg-zinc-950/50 relative flex items-center justify-center overflow-hidden border-b border-zinc-800/50">
                                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
                                            <LayoutGrid className="w-16 h-16 text-zinc-800 transition-all duration-500 group-hover:text-indigo-500/20 group-hover:scale-110" />

                                            <div className="absolute top-4 left-4 px-2.5 py-1 bg-zinc-900/90 border border-zinc-700/50 rounded-xl flex items-center gap-2 shadow-2xl">
                                                <CategoryIcon category={template.category} />
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{template.category}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col gap-2">
                                            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">{template.name}</h3>
                                            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium">{template.description}</p>

                                            <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-0.5 bg-zinc-800 rounded-md border border-zinc-700/50">{template.nodes.length} Blocks</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    Deploy <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
