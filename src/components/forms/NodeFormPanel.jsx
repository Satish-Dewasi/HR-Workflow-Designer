import { useWorkflow } from "../../hooks/useWorkflow";
import StartForm from "./StartForm";
import TaskForm from "./TaskForm";
import ApprovalForm from "./ApprovalForm";
import AutoForm from "./AutoForm";
import EndForm from "./EndForm";
import "./FormPanel.css";
import {
  BookCheck,
  CircleDot,
  CircleQuestionMark,
  Signature,
  Squircle,
  Workflow,
} from "lucide-react";

const NODE_META = {
  startNode: {
    label: "Start Node",
    icon: <Squircle />,
    color: "var(--node-start)",
  },
  taskNode: {
    label: "Task Node",
    icon: <BookCheck />,
    color: "var(--node-task)",
  },
  approvalNode: {
    label: "Approval Node",
    icon: <Signature />,
    color: "var(--node-approval)",
  },
  autoNode: {
    label: "Automated Step Node",
    icon: <Workflow />,
    color: "var(--node-auto)",
  },
  endNode: { label: "End Node", icon: <CircleDot />, color: "var(--node-end)" },
};

const FORM_MAP = {
  startNode: StartForm,
  taskNode: TaskForm,
  approvalNode: ApprovalForm,
  autoNode: AutoForm,
  endNode: EndForm,
};

function NodeFormPanel() {
  const { selectedNode, onUpdateNodeData, onDeleteNode, deselectNode } =
    useWorkflow();

  if (!selectedNode) return null;

  const meta = NODE_META[selectedNode.type] || {
    label: selectedNode.type,
    icon: <CircleQuestionMark />,
    color: "var(--accent)",
  };
  const FormComponent = FORM_MAP[selectedNode.type];

  const handleChange = (partialData) => {
    onUpdateNodeData(selectedNode.id, partialData);
  };

  return (
    <div className="form-panel">
      <div
        className="form-panel__header"
        style={{ "--meta-color": meta.color }}
      >
        <div className="form-panel__title">
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
        </div>
        <button
          className="form-panel__close"
          onClick={deselectNode}
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Form body */}
      <div className="form-panel__body">
        {FormComponent ? (
          <FormComponent data={selectedNode.data} onChange={handleChange} />
        ) : (
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
            No form for this node type.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="form-panel__footer">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDeleteNode(selectedNode.id)}
        >
          Delete Node
        </button>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          ID: {selectedNode.id.slice(0, 12)}…
        </span>
      </div>
    </div>
  );
}

export default NodeFormPanel;
