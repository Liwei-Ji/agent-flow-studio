import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Save, Upload, Settings as SettingsIcon } from 'lucide-react';

import { Agent } from './nodes/Agent';
import { LLM } from './nodes/LLM';
import { Skill } from './nodes/Skill';
import { RAG } from './nodes/RAG';
import { Tool } from './nodes/Tool';
import { MCP } from './nodes/MCP';
import { Group } from './nodes/Group';
import { Input } from './nodes/Input';
import { Output } from './nodes/Output';
import { Note } from './nodes/Note';
import { Condition } from './nodes/Condition';
import { Transform } from './nodes/Transform';
import { Loop } from './nodes/Loop';
import { Sidebar } from './Sidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { ContextMenu } from './ContextMenu';
import { DeletableEdge } from './edges/DeletableEdge';
import { SettingsModal, SettingsData } from './SettingsModal';
import { Toolbar } from './Toolbar';
import { TemplateModal } from './TemplateModal';
import { TEMPLATES, WorkflowTemplate } from '../lib/templates';

const SETTINGS_STORAGE_KEY = 'agent-flow-settings';
const DEFAULT_SETTINGS: SettingsData = {
  openaiKey: '',
  geminiKey: '',
  snapToGrid: true,
  showGrid: true,
};

const nodeTypes = {
  agent: Agent,
  llm: LLM,
  skill: Skill,
  rag: RAG,
  tool: Tool,
  mcp: MCP,
  group: Group,
  Input: Input,
  Output: Output,
  note: Note,
  condition: Condition,
  transform: Transform,
  loop: Loop,
};

const edgeTypes = {
  deletable: DeletableEdge,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agent',
    position: { x: 250, y: 150 },
    data: { label: 'Agent', status: 'completed' },
  },
  {
    id: '2',
    type: 'llm',
    position: { x: 550, y: 100 },
    data: { label: 'LLM', status: 'running' },
  },
  {
    id: '3',
    type: 'mcp',
    position: { x: 550, y: 300 },
    data: { label: 'MCP', status: 'pending' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'deletable', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', type: 'deletable', animated: false, style: { stroke: '#71717a', strokeWidth: 2 } },
];

let id = 4;
const getId = () => `${id++}`;

function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, toObject, setViewport } = useReactFlow();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [menu, setMenu] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);

  // Load settings on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    }
  }, []);

  // Save settings on change
  const updateSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const isRunning = sourceNode?.data.status === 'running';
      const isLoopRetry = params.sourceHandle === 'loop-return';

      const newEdge = {
        ...params,
        type: 'deletable',
        animated: isRunning,
        style: {
          stroke: isRunning ? (isLoopRetry ? '#f97316' : '#3b82f6') : '#71717a',
          strokeWidth: 2,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, nodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const getLabel = (type: string) => {
        switch (type) {
          case 'Input': return 'Input';
          case 'Output': return 'Output';
          case 'agent': return 'Agent';
          case 'llm': return 'LLM';
          case 'skill': return 'Skill';
          case 'rag': return 'RAG';
          case 'tool': return 'Tool';
          case 'mcp': return 'MCP';
          case 'condition': return 'Condition';
          case 'transform': return 'Transform';
          case 'loop': return 'Loop';
          case 'group': return 'Group';
          case 'note': return 'Note';
          default: return type.charAt(0).toUpperCase() + type.slice(1);
        }
      };

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: getLabel(type), status: 'pending' },
        ...(type === 'group' ? {
          style: { width: 400, height: 300, backgroundColor: 'rgba(39, 39, 42, 0.5)', border: '1px dashed #52525b', borderRadius: '12px' },
          className: 'group',
        } : {}),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((_, node: Node) => {
    setSelectedNode(node);
    setMenu(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setMenu(null);
  }, []);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();

      const pane = reactFlowWrapper.current?.getBoundingClientRect();
      if (!pane) return;

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 ? event.clientY : undefined,
        left: event.clientX < pane.width - 200 ? event.clientX : undefined,
        right: event.clientX >= pane.width - 200 ? pane.width - event.clientX : undefined,
        bottom: event.clientY >= pane.height - 200 ? pane.height - event.clientY : undefined,
      });
    },
    [setMenu]
  );

  const onNodeUpdate = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data };
          }
          return node;
        })
      );

      // Update edges animation if status changes
      if (data.status) {
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.source === nodeId) {
              const isRunning = data.status === 'running';
              const isLoopRetry = edge.sourceHandle === 'loop-return';
              return {
                ...edge,
                animated: isRunning,
                style: {
                  ...edge.style,
                  stroke: isRunning ? (isLoopRetry ? '#f97316' : '#3b82f6') : '#71717a',
                }
              };
            }
            return edge;
          })
        );
      }

      if (selectedNode?.id === nodeId) {
        setSelectedNode((prev) => prev ? { ...prev, data } : null);
      }
    },
    [setNodes, setEdges, selectedNode]
  );

  const handleDuplicate = useCallback((id: string) => {
    const nodeToDuplicate = nodes.find((n) => n.id === id);
    if (nodeToDuplicate) {
      const newNode = {
        ...nodeToDuplicate,
        id: getId(),
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
        selected: false,
      };
      setNodes((nds) => nds.concat(newNode));
    }
  }, [nodes, setNodes]);

  const handleDelete = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  }, [setNodes, setEdges, selectedNode]);

  const handleSave = useCallback(() => {
    const flow = toObject();
    const jsonString = JSON.stringify(flow, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'agent-workflow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [toObject]);

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const flow = JSON.parse(e.target?.result as string);
        if (flow && flow.nodes && flow.edges) {
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          if (flow.viewport) {
            setViewport(flow.viewport);
          }
        } else {
          alert('Invalid workflow file format.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to parse the file.');
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be loaded again if needed
    event.target.value = '';
  }, [setNodes, setEdges, setViewport]);

  const handleClear = useCallback(() => {
    if (nodes.length > 0 && window.confirm('Are you sure you want to clear the entire canvas?')) {
      setNodes([]);
      setEdges([]);
    }
  }, [nodes, setNodes, setEdges]);

  const handleApplyTemplate = useCallback((template: WorkflowTemplate) => {
    if (nodes.length > 0 && !window.confirm('Applying a template will replace your current workflow. Proceed?')) {
      return;
    }
    setNodes(template.nodes);
    setEdges(template.edges);
    setShowTemplates(false);
  }, [nodes, setNodes, setEdges]);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-200 overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSettings={() => setShowSettings(true)}
      />

      <div className="flex-1 relative w-full h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.5, maxZoom: 0.8 }}
          className="bg-zinc-950"
          minZoom={0.1}
          maxZoom={2}
          snapToGrid={settings.snapToGrid}
          snapGrid={[24, 24]}
          connectionRadius={40}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: '#71717a' },
            type: 'deletable',
          }}
        >
          {settings.showGrid && (
            <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#3f3f46" />
          )}
          <Controls className="bg-zinc-800 border-zinc-700 fill-zinc-300 pointer-events-auto" />

          {/* Hidden input for loading files */}
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <Panel position="top-right" className="flex gap-2 m-4 pointer-events-auto">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-xl group relative"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500" />
            </button>
          </Panel>
        </ReactFlow>

        {menu && (
          <ContextMenu
            {...menu}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onSettings={(id) => {
              const node = nodes.find((n) => n.id === id);
              if (node) setSelectedNode(node);
            }}
            onHistory={() => alert('History view not implemented')}
            onClose={() => setMenu(null)}
          />
        )}
      </div>

      {selectedNode && (
        <PropertiesPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={onNodeUpdate}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdate={updateSettings}
      />

      <Toolbar
        onImport={handleLoadClick}
        onExport={handleSave}
        onOpenTemplates={() => setShowTemplates(true)}
        onClear={handleClear}
      />

      <TemplateModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleApplyTemplate}
      />
    </div>
  );
}

export default function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
