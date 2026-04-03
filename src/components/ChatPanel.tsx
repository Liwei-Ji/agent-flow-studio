import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Sparkles, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onSendMessage: (message: string) => void;
    messages: Message[];
    isLoading: boolean;
}

export function ChatPanel({ isOpen, onClose, onSendMessage, messages, isLoading }: ChatPanelProps) {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                    className="fixed top-4 right-4 bottom-4 w-96 bg-zinc-900/80 backdrop-blur-3xl border border-zinc-700/30 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.6)] z-50 flex flex-col overflow-hidden"
                >
                    {/* Header - Just the close button now */}
                    <div className="p-4 flex items-center justify-end">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                    >
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <h3 className="text-zinc-300 font-semibold mb-1">Start with a message</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Your workflow will follow your prompt.
                                </p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex flex-col gap-2 max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-2 text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-lg"
                                            : "text-zinc-300 font-medium"
                                    )}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex flex-col gap-2 mr-auto items-start animate-pulse">
                                <div className="text-zinc-500 flex gap-1 px-4">
                                    <div className="w-1 h-1 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1 h-1 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1 h-1 bg-indigo-500/50 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-6 bg-zinc-900/50 border-t border-zinc-800/50">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full bg-zinc-950 border border-zinc-700/50 rounded-xl py-3 pl-4 pr-12 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all active:scale-90"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
