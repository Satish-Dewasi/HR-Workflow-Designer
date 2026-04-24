import { memo } from "react";
import BaseNode from "./BaseNode";
import { BookCheck } from "lucide-react";

function TaskNode({ data, selected }) {
  return (
    <BaseNode
      nodeType="task"
      color="var(--node-task)"
      icon={<BookCheck />}
      selected={selected}
    >
      <div
        className="base-node__type-badge"
        style={{ color: "var(--node-task)", marginBottom: 3 }}
      >
        Task
      </div>
      <div className="base-node__label">{data.label || "Task"}</div>
      {data.assignee && (
        <div className="base-node__sub">👤 {data.assignee}</div>
      )}
      {data.dueDate && <div className="base-node__sub">📅 {data.dueDate}</div>}
    </BaseNode>
  );
}

export default memo(TaskNode);
