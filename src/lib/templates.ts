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
    }
];
