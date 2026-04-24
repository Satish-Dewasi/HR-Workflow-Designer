import { useState } from "react";
import { useSelector } from "react-redux";
import { useSimulateWorkflowMutation } from "../../api/workflowApi";
import { selectNodes, selectEdges } from "../../store/slices/workflowSlice";
import "./SandboxPanel.css";

function SandboxPanel({ onClose }) {
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);
  const [simulate, { isLoading }] = useSimulateWorkflowMutation();
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    setResult(null);
    const res = await simulate({ nodes, edges });
    if (res.data) setResult(res.data);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sandbox-overlay">
      <div className="sandbox-panel">
        {/* Header */}
        <div className="sandbox-panel__header">
          <div className="sandbox-panel__title">
            <span></span>
            <span>Workflow Sandbox</span>
          </div>
          <button className="sandbox-panel__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Stats row */}
        <div className="sandbox-stats">
          <div className="sandbox-stat">
            <div className="sandbox-stat__value">{nodes.length}</div>
            <div className="sandbox-stat__label">Nodes</div>
          </div>
          <div className="sandbox-stat">
            <div className="sandbox-stat__value">{edges.length}</div>
            <div className="sandbox-stat__label">Edges</div>
          </div>
          <div className="sandbox-stat">
            <div className="sandbox-stat__value">
              {result ? (result.success ? "✅" : "❌") : "—"}
            </div>
            <div className="sandbox-stat__label">Status</div>
          </div>
        </div>

        {/* Actions */}
        <div className="sandbox-actions">
          <button
            className="btn btn-primary"
            onClick={handleRun}
            disabled={isLoading || nodes.length === 0}
          >
            {isLoading ? "Running…" : "Run Simulation"}
          </button>
          <button className="btn btn-ghost" onClick={handleExportJSON}>
            Export JSON
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="sandbox-results">
            {/* Errors */}
            {result.errors?.length > 0 && (
              <div className="sandbox-errors">
                <div className="sandbox-section-label">Validation Errors</div>
                {result.errors.map((err, i) => (
                  <div key={i} className="sandbox-error-item">
                    {err}
                  </div>
                ))}
              </div>
            )}

            {/* Execution log */}
            {result.success && result.logs?.length > 0 && (
              <div className="sandbox-log">
                <div className="sandbox-section-label">Execution Log</div>
                {result.logs.map((log) => (
                  <div key={log.nodeId} className="sandbox-log-item">
                    <div className="sandbox-log-step">Step {log.step}</div>
                    <div className="sandbox-log-type">{log.type}</div>
                    <div className="sandbox-log-detail">{log.detail}</div>
                  </div>
                ))}
                <div className="sandbox-log-done">
                  Simulation complete — {result.logs.length} step
                  {result.logs.length > 1 ? "s" : ""} executed.
                </div>
              </div>
            )}

            {result.success && result.logs?.length === 0 && (
              <div
                style={{
                  padding: 16,
                  color: "var(--text-muted)",
                  fontSize: 13,
                }}
              >
                No steps executed. Add nodes to the canvas.
              </div>
            )}
          </div>
        )}

        {!result && !isLoading && (
          <div className="sandbox-empty">
            Click <strong>Run Simulation</strong> to validate and execute the
            workflow. The engine will traverse the graph from Start → End and
            produce a step-by-step log.
          </div>
        )}
      </div>
    </div>
  );
}

export default SandboxPanel;
