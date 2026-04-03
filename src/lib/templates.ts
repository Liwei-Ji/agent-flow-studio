import { Node, Edge } from '@xyflow/react';

export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    nodes: Node[];
    edges: Edge[];
}

export const TEMPLATES: WorkflowTemplate[] = [
    {
        id: 'basic-rag',
        name: 'Basic RAG QA',
        description: 'Knowledge based question answering using RAG.',
        category: 'Knowledge',
        nodes: [
            { id: '1', type: 'Input', position: { x: 100, y: 150 }, data: { label: 'User Query', status: 'pending' } },
            { id: '2', type: 'rag', position: { x: 350, y: 150 }, data: { label: 'Knowledge Base', status: 'pending', description: 'Search relevant docs' } },
            { id: '3', type: 'llm', position: { x: 600, y: 150 }, data: { label: 'Answer Gen', status: 'pending' } },
            { id: '4', type: 'Output', position: { x: 850, y: 150 }, data: { label: 'Final Answer', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
        ]
    },
    {
        id: 'autonomous-agent',
        name: 'Autonomous Agent',
        description: 'Goal oriented agent with tool-calling capabilities.',
        category: 'Agentic',
        nodes: [
            { id: '1', type: 'Input', position: { x: 100, y: 200 }, data: { label: 'Goal', status: 'pending' } },
            { id: '2', type: 'agent', position: { x: 350, y: 180 }, data: { label: 'Planner Agent', status: 'pending' } },
            { id: '3', type: 'tool', position: { x: 600, y: 100 }, data: { label: 'Web Search', status: 'pending' } },
            { id: '4', type: 'tool', position: { x: 600, y: 250 }, data: { label: 'File Writer', status: 'pending' } },
            { id: '5', type: 'Output', position: { x: 850, y: 200 }, data: { label: 'Completion', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e2-4', source: '2', target: '4', animated: true },
            { id: 'e2-5', source: '2', target: '5', animated: true },
        ]
    },
    {
        id: 'translation-expert',
        name: 'Translation Expert',
        description: 'Multi stage translation with refinement and polishing.',
        category: 'Creative',
        nodes: [
            { id: '1', type: 'Input', position: { x: 50, y: 200 }, data: { label: 'Source Text', status: 'pending' } },
            { id: '2', type: 'llm', position: { x: 300, y: 200 }, data: { label: 'Draft Trans', status: 'pending' } },
            { id: '3', type: 'llm', position: { x: 550, y: 200 }, data: { label: 'Polishing', status: 'pending' } },
            { id: '4', type: 'Output', position: { x: 800, y: 200 }, data: { label: 'Final Text', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
        ]
    },
    {
        id: 'market-researcher',
        name: 'Market Researcher',
        description: 'Auto-search, clean and analyze market trends.',
        category: 'Agentic',
        nodes: [
            { id: '1', type: 'Input', position: { x: 50, y: 150 }, data: { label: 'Research Topic', status: 'pending' } },
            { id: '2', type: 'agent', position: { x: 300, y: 150 }, data: { label: 'Web Scraper Agent', status: 'pending' } },
            { id: '3', type: 'transform', position: { x: 550, y: 150 }, data: { label: 'Data Cleaning', status: 'pending' } },
            { id: '4', type: 'llm', position: { x: 800, y: 150 }, data: { label: 'Trend Analysis', status: 'pending' } },
            { id: '5', type: 'Output', position: { x: 1050, y: 150 }, data: { label: 'Final Report', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true },
        ]
    },
    {
        id: 'model-benchmark',
        name: 'Model Benchmark',
        description: 'Compare GPT-4 and Claude 3 responses side-by-side.',
        category: 'Research',
        nodes: [
            { id: '1', type: 'Input', position: { x: 50, y: 150 }, data: { label: 'User Prompt', status: 'pending' } },
            { id: '2a', type: 'llm', position: { x: 300, y: 50 }, data: { label: 'GPT-4 Engine', status: 'pending' } },
            { id: '2b', type: 'llm', position: { x: 300, y: 250 }, data: { label: 'Claude 3 Engine', status: 'pending' } },
            { id: '3', type: 'transform', position: { x: 550, y: 150 }, data: { label: 'Side-by-side Compare', status: 'pending' } },
            { id: '4', type: 'Output', position: { x: 800, y: 150 }, data: { label: 'Comparison Result', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2a', source: '1', target: '2a', animated: true },
            { id: 'e1-2b', source: '1', target: '2b', animated: true },
            { id: 'e2a-3', source: '2a', target: '3', animated: true },
            { id: 'e2b-3', source: '2b', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
        ]
    },
    {
        id: 'self-correction',
        name: 'Self-Correction Loop',
        description: 'Multi-stage writing with self-criticism and recursive improvement.',
        category: 'Logic',
        nodes: [
            { id: '1', type: 'Input', position: { x: 50, y: 150 }, data: { label: 'Draft Topic', status: 'pending' } },
            { id: '2', type: 'llm', position: { x: 300, y: 150 }, data: { label: 'Initial Generator', status: 'pending' } },
            { id: '3', type: 'llm', position: { x: 550, y: 150 }, data: { label: 'Self-Critic', status: 'pending' } },
            { id: '4', type: 'condition', position: { x: 800, y: 150 }, data: { label: 'Score > 80?', status: 'pending' } },
            { id: '5', type: 'Output', position: { x: 1050, y: 150 }, data: { label: 'Final Polish', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true },
            { id: 'e4-2-loop', source: '4', target: '2', targetHandle: 'loop-return', animated: true, label: 'Retry', style: { stroke: '#fb923c' } },
        ]
    },
    {
        id: 'advanced-rag',
        name: 'Advanced RAG with MCP',
        description: 'Connect Local SQLite/File systems via MCP to LLM workflows.',
        category: 'Knowledge',
        nodes: [
            { id: '1', type: 'Input', position: { x: 50, y: 150 }, data: { label: 'System Inquiry', status: 'pending' } },
            { id: '2', type: 'mcp', position: { x: 300, y: 150 }, data: { label: 'Local SQLite MCP', status: 'pending' } },
            { id: '3', type: 'rag', position: { x: 550, y: 150 }, data: { label: 'Semantic Search', status: 'pending' } },
            { id: '4', type: 'llm', position: { x: 800, y: 150 }, data: { label: 'Contextual Response', status: 'pending' } },
            { id: '5', type: 'Output', position: { x: 1050, y: 150 }, data: { label: 'Final Output', status: 'pending' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true },
        ]
    }
];
