import { memo } from "react";
import BaseNode from "./BaseNode";
import { Workflow } from "lucide-react";

function AutoNode({ data, selected }) {
  return (
    <BaseNode
      nodeType="auto"
      color="var(--node-auto)"
      icon={<Workflow />}
      selected={selected}
    >
      <div
        className="base-node__type-badge"
        style={{ color: "var(--node-auto)", marginBottom: 3 }}
      >
        Automated
      </div>
      <div className="base-node__label">{data.label || "Automated Step"}</div>
      {data.actionId && <div className="base-node__badge">{data.actionId}</div>}
    </BaseNode>
  );
}

export default memo(AutoNode);
