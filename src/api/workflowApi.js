import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workflowApi = createApi({
  reducerPath: "workflowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getAutomations: builder.query({
      query: () => "automations",
    }),

    simulateWorkflow: builder.mutation({
      queryFn: async (workflowData) => {
        try {
          const result = runLocalSimulation(workflowData);

          fetch("/api/simulations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              ...result,
            }),
          }).catch(() => {});

          return { data: result };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

function runLocalSimulation({ nodes, edges }) {
  const logs = [];
  const errors = [];
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edgeMap = {}; // sourceId → [targetId]
  for (const edge of edges) {
    if (!edgeMap[edge.source]) edgeMap[edge.source] = [];
    edgeMap[edge.source].push(edge.target);
  }

  // Validation checks
  const startNodes = nodes.filter((n) => n.type === "startNode");
  const endNodes = nodes.filter((n) => n.type === "endNode");

  if (startNodes.length === 0) errors.push("No Start Node found.");
  if (startNodes.length > 1) errors.push("Multiple Start Nodes detected.");
  if (endNodes.length === 0) errors.push("No End Node found.");

  const connectedIds = new Set([
    ...edges.map((e) => e.source),
    ...edges.map((e) => e.target),
  ]);
  for (const node of nodes) {
    if (!connectedIds.has(node.id)) {
      errors.push(`Node "${node.data.label || node.type}" is not connected.`);
    }
  }

  // Detect cycles via DFS
  if (hasCycle(nodes, edgeMap)) {
    errors.push("Cycle detected in workflow graph.");
  }

  if (errors.length > 0) {
    return { success: false, errors, logs: [] };
  }

  // Walk graph from start node
  const visited = new Set();
  const queue = [startNodes[0].id];
  let step = 1;

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = nodeMap[currentId];
    if (!node) continue;

    logs.push(buildLogEntry(step++, node));

    const nextIds = edgeMap[currentId] || [];
    queue.push(...nextIds);
  }

  return { success: true, errors: [], logs };
}

function buildLogEntry(step, node) {
  const { type, data } = node;
  const typeLabels = {
    startNode: "START",
    taskNode: "TASK",
    approvalNode: "APPROVAL",
    autoNode: "AUTO",
    endNode: "END",
  };
  const label = typeLabels[type] || type;

  let detail = data.label || "Unnamed";
  if (type === "taskNode" && data.assignee)
    detail += ` → Assigned to: ${data.assignee}`;
  if (type === "approvalNode" && data.approverRole)
    detail += ` → Approver: ${data.approverRole}`;
  if (type === "autoNode" && data.actionId)
    detail += ` → Action: ${data.actionId}`;
  if (type === "endNode" && data.endMessage)
    detail += ` — "${data.endMessage}"`;

  return { step, type: label, detail, nodeId: node.id };
}

function hasCycle(nodes, edgeMap) {
  const WHITE = 0,
    GRAY = 1,
    BLACK = 2;
  const color = Object.fromEntries(nodes.map((n) => [n.id, WHITE]));

  function dfs(id) {
    color[id] = GRAY;
    for (const neighbor of edgeMap[id] || []) {
      if (color[neighbor] === GRAY) return true;
      if (color[neighbor] === WHITE && dfs(neighbor)) return true;
    }
    color[id] = BLACK;
    return false;
  }

  for (const node of nodes) {
    if (color[node.id] === WHITE && dfs(node.id)) return true;
  }
  return false;
}

export const { useGetAutomationsQuery, useSimulateWorkflowMutation } =
  workflowApi;
