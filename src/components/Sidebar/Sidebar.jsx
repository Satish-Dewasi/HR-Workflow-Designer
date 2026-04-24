import "./Sidebar.css";
import {
  BookCheck,
  CircleDot,
  CircleQuestionMark,
  Signature,
  Squircle,
  Workflow,
} from "lucide-react";

const NODE_PALETTE = [
  {
    type: "startNode",
    label: "Start Node",
    icon: <Squircle />,
    color: "var(--node-start)",
    desc: "Workflow entry point",
  },
  {
    type: "taskNode",
    label: "Task Node",
    icon: <BookCheck />,
    color: "var(--node-task)",
    desc: "Human task / action",
  },
  {
    type: "approvalNode",
    label: "Approval Node",
    icon: <Signature />,
    color: "var(--node-approval)",
    desc: "Manager / HR approval",
  },
  {
    type: "autoNode",
    label: "Automated Step",
    icon: <Workflow />,
    color: "var(--node-auto)",
    desc: "System-triggered action",
  },
  {
    type: "endNode",
    label: "End Node",
    icon: <CircleDot />,
    color: "var(--node-end)",
    desc: "Workflow completion",
  },
];

function Sidebar() {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData("application/reactflow-type", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__logo">HR</span>
        <div>
          <div className="sidebar__title">Workflow Designer</div>
          <div className="sidebar__subtitle">Tredence Analytics</div>
        </div>
      </div>

      <div className="sidebar__section-label">Node Palette</div>
      <div className="sidebar__tip">Drag nodes onto the canvas →</div>

      <div className="sidebar__nodes">
        {NODE_PALETTE.map((node) => (
          <div
            key={node.type}
            className="sidebar__node-item"
            style={{ "--item-color": node.color }}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <span className="sidebar__node-icon">{node.icon}</span>
            <div>
              <div className="sidebar__node-label">{node.label}</div>
              <div className="sidebar__node-desc">{node.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar__section-label" style={{ marginTop: "auto" }}>
        Help
      </div>
      <div className="sidebar__hints">
        <div className="sidebar__hint">Click node to edit</div>
        <div className="sidebar__hint">Drag between handles to connect</div>
        <div className="sidebar__hint">Select + Delete key to remove</div>
        <div className="sidebar__hint">Use Sandbox to test workflow</div>
      </div>
    </aside>
  );
}

export default Sidebar;
