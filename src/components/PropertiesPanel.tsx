import { X, Trash2, Copy, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface PropertiesPanelProps {
  node: any;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (nodeId: string) => void;
}

const NOTE_COLORS = [
  { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-400' },
  { value: 'blue', label: 'Blue', bg: 'bg-blue-400' },
  { value: 'green', label: 'Green', bg: 'bg-green-400' },
  { value: 'pink', label: 'Pink', bg: 'bg-pink-400' },
  { value: 'purple', label: 'Purple', bg: 'bg-purple-400' },
];

const NODE_TYPE_INFO: Record<string, { label: string, description: string }> = {
  agent: { label: 'Agent', description: '具備自主思考與規劃能力的 AI 實體。給定目標後，它能自行決定步驟並調用工具來完成任務。' },
  llm: { label: 'LLM', description: '純粹的語言大腦（如 GPT-4, Claude）。負責理解與生成文字，但不會自主行動或調用外部工具。' },
  skill: { label: 'Skill', description: '預先封裝好的高階能力或子工作流（例如：文章總結、資料分析）。通常由多個步驟組成。' },
  tool: { label: 'Tool', description: '單一、具體的執行動作。讓 AI 能夠與外部世界互動（例如：Google 搜尋、讀取本地檔案、API 呼叫）。' },
  mcp: { label: 'MCP', description: '標準化的連接協議。用於安全地將 AI 模型與外部資料源或本地端系統進行深度整合。' },
  rag: { label: 'RAG', description: '檢索增強生成。結合外部知識庫，讓 AI 能根據特定文件或資料回答問題，減少幻覺。' },
  condition: { label: 'Condition', description: '條件判斷（Router）。根據設定的邏輯條件，將資料流導向不同的分支（例如：True 或 False）。' },
  transform: { label: 'Transform', description: '資料轉換。用於處理不同節點間的資料格式差異，例如將 JSON 轉換為 Markdown，或是進行欄位映射。' },
  loop: { label: 'Loop', description: '迴圈控制（Loop Controller）。作為迴圈的進入點與計數器，通常與 Condition 節點配合使用，實現「重試」或「重複執行」的邏輯。' },
  group: { label: 'Group', description: '群組節點。用於將多個相關節點組織在一起，方便管理與視覺化。' },
  note: { label: 'Note', description: '便利貼。用於在工作區中添加註解或說明文字。' },
  Input: { label: 'Input', description: '工作流的起點。用於接收外部輸入資料。' },
  Output: { label: 'Output', description: '工作流的終點。用於輸出最終處理結果。' },
};

export function PropertiesPanel({ node, onClose, onUpdate, onDelete, onDuplicate }: PropertiesPanelProps) {
  if (!node) return null;

  const handleChange = (field: string, value: string) => {
    onUpdate(node.id, { ...node.data, [field]: value });
  };

  const isNote = node.type === 'note';
  const nodeInfo = NODE_TYPE_INFO[node.type] || { label: 'Node', description: '' };

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col h-full shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-zinc-200">{nodeInfo.label}</h3>
          {nodeInfo.description && (
            <div className="group relative flex items-center">
              <Info className="w-4 h-4 text-zinc-500 hover:text-zinc-300 cursor-help transition-colors" />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl text-xs text-zinc-300 leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                {nodeInfo.description}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-800 border-t border-l border-zinc-700 rotate-45"></div>
              </div>
            </div>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</label>
          <input
            type="text"
            value={node.data.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={isNote ? "Optional note title..." : "Node name..."}
          />
        </div>

        {!isNote && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</label>
            <select
              value={node.data.status || 'pending'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="error">Error</option>
            </select>
          </div>
        )}

        {isNote && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Color</label>
            <div className="flex gap-2">
              {NOTE_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleChange('color', color.value)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    color.bg,
                    node.data.color === color.value || (!node.data.color && color.value === 'yellow')
                      ? "border-white scale-110"
                      : "border-transparent hover:scale-110"
                  )}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</label>
          <textarea
            value={node.data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={isNote ? 6 : 3}
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder={isNote ? "Note content..." : "Node description..."}
          />
        </div>

        {node.type === 'condition' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Condition Logic</label>
            <input
              type="text"
              value={node.data.conditionLogic || ''}
              onChange={(e) => handleChange('conditionLogic', e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
              placeholder="e.g., sentiment == 'negative'"
            />
          </div>
        )}

        {node.type === 'transform' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Transform Logic (JS/JSON)</label>
            <textarea
              value={node.data.transformLogic || ''}
              onChange={(e) => handleChange('transformLogic', e.target.value)}
              rows={6}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono resize-none"
              placeholder="e.g., return { result: input.data.map(x => x.name) }"
            />
          </div>
        )}

        {node.type === 'loop' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Max Iterations</label>
              <input
                type="number"
                value={node.data.maxIterations || 3}
                onChange={(e) => handleChange('maxIterations', e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="1"
                max="100"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Loop Mode</label>
              <select
                value={node.data.loopMode || 'retry'}
                onChange={(e) => handleChange('loopMode', e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="retry">Retry (Until success)</option>
                <option value="foreach">For-Each (Iterate list)</option>
              </select>
            </div>
          </div>
        )}

        {!isNote && node.type !== 'condition' && node.type !== 'transform' && node.type !== 'loop' && node.type !== 'Output' && node.type !== 'output' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">System Prompt</label>
            <textarea
              value={node.data.prompt || ''}
              onChange={(e) => handleChange('prompt', e.target.value)}
              rows={6}
              className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono"
              placeholder="Enter system prompt here..."
            />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 flex flex-col gap-2">
        <button
          onClick={() => onDuplicate(node.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-md transition-colors text-sm font-medium"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={() => onDelete(node.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
