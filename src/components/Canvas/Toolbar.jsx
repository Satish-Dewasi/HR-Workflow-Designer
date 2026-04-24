import { useState } from "react";
import { useWorkflow } from "../../hooks/useWorkflow";
import SandboxPanel from "../SandboxPanel/SandboxPanel";
import "./Toolbar.css";

function Toolbar() {
  const { onClearWorkflow, nodes, edges } = useWorkflow();
  const [showSandbox, setShowSandbox] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = () => {
    if (confirmClear) {
      onClearWorkflow();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <>
      <header className="toolbar">
        <div className="toolbar__left">
          <div className="toolbar__workflow-name">HR Workflow Designer</div>
          <div className="toolbar__counts">
            <span className="toolbar__badge">{nodes.length} nodes</span>
            <span className="toolbar__badge">{edges.length} edges</span>
          </div>
        </div>

        <div className="toolbar__right">
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleClear}
            title="Clear canvas"
          >
            {confirmClear ? "⚠ Confirm clear?" : "🗑 Clear"}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowSandbox(true)}
          >
            Test Workflow
          </button>
        </div>
      </header>

      {showSandbox && <SandboxPanel onClose={() => setShowSandbox(false)} />}
    </>
  );
}

export default Toolbar;
