import { useRef, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  BackgroundVariant,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import nodeTypes from "../nodes";
import { useWorkflow } from "../../hooks/useWorkflow";
import "./Canvas.css";

function Canvas() {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDropNode,
    onNodeClick,
    onPaneClick,
  } = useWorkflow();

  const reactFlowInstance = useRef(null);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("application/reactflow-type");
      if (!type || !reactFlowInstance.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });
      onDropNode(type, position);
    },
    [onDropNode],
  );

  return (
    <div className="canvas-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode="Delete"
        snapToGrid
        snapGrid={[16, 16]}
        connectionLineStyle={{ stroke: "var(--accent)", strokeWidth: 2 }}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: "var(--border-light)", strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="var(--border)"
          gap={24}
          size={1.5}
        />
        <Controls />
        <MiniMap
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
          }}
          nodeColor={(node) => {
            const colors = {
              startNode: "#22c55e",
              taskNode: "#3b82f6",
              approvalNode: "#a855f7",
              autoNode: "#f59e0b",
              endNode: "#ef4444",
            };
            return colors[node.type] || "#555e7a";
          }}
          maskColor="rgba(15,17,23,0.7)"
        />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
