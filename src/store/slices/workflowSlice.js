import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialNodes = [
  {
    id: "node-start-1",
    type: "startNode",
    position: { x: 250, y: 80 },
    data: { label: "Onboarding Start", metadata: [] },
  },
  {
    id: "node-task-1",
    type: "taskNode",
    position: { x: 250, y: 220 },
    data: {
      label: "Collect Documents",
      description: "Employee submits ID, degree certs, etc.",
      assignee: "HR Coordinator",
      dueDate: "",
      customFields: [],
    },
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: "node-start-1",
    target: "node-task-1",
    animated: true,
  },
];

const workflowSlice = createSlice({
  name: "workflow",
  initialState: {
    nodes: initialNodes,
    edges: initialEdges,
    selectedNodeId: null,
  },
  reducers: {
    setNodes(state, action) {
      state.nodes = action.payload;
    },

    setEdges(state, action) {
      state.edges = action.payload;
    },

    addEdge(state, action) {
      const { source, target, sourceHandle, targetHandle } = action.payload;
      const exists = state.edges.some(
        (e) => e.source === source && e.target === target,
      );
      if (!exists) {
        state.edges.push({
          id: `edge-${uuidv4()}`,
          source,
          target,
          sourceHandle,
          targetHandle,
          animated: true,
        });
      }
    },

    addNode(state, action) {
      const { type, position } = action.payload;
      const defaultData = getDefaultData(type);
      state.nodes.push({
        id: `node-${uuidv4()}`,
        type,
        position,
        data: defaultData,
      });
    },

    selectNode(state, action) {
      state.selectedNodeId = action.payload;
    },

    deselectNode(state) {
      state.selectedNodeId = null;
    },

    updateNodeData(state, action) {
      const { nodeId, data } = action.payload;
      const node = state.nodes.find((n) => n.id === nodeId);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },

    deleteNode(state, action) {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((n) => n.id !== nodeId);
      state.edges = state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      );
      if (state.selectedNodeId === nodeId) state.selectedNodeId = null;
    },

    deleteEdge(state, action) {
      state.edges = state.edges.filter((e) => e.id !== action.payload);
    },

    clearWorkflow(state) {
      state.nodes = [];
      state.edges = [];
      state.selectedNodeId = null;
    },
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDefaultData(type) {
  switch (type) {
    case "startNode":
      return { label: "Start", metadata: [] };
    case "taskNode":
      return {
        label: "New Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      };
    case "approvalNode":
      return {
        label: "Approval",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      };
    case "autoNode":
      return { label: "Automated Step", actionId: "", actionParams: {} };
    case "endNode":
      return {
        label: "End",
        endMessage: "Workflow complete.",
        summaryFlag: false,
      };
    default:
      return { label: type };
  }
}

export const {
  setNodes,
  setEdges,
  addEdge,
  addNode,
  selectNode,
  deselectNode,
  updateNodeData,
  deleteNode,
  deleteEdge,
  clearWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectNodes = (s) => s.workflow.nodes;
export const selectEdges = (s) => s.workflow.edges;
export const selectSelectedId = (s) => s.workflow.selectedNodeId;
export const selectSelectedNode = (s) =>
  s.workflow.nodes.find((n) => n.id === s.workflow.selectedNodeId) ?? null;
