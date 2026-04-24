import { memo } from "react";
import BaseNode from "./BaseNode";
import { Squircle } from "lucide-react";

function StartNode({ data, selected }) {
  return (
    <BaseNode
      nodeType="start"
      color="var(--node-start)"
      icon={<Squircle />}
      selected={selected}
      hasTarget={false}
    >
      <div
        className="base-node__type-badge"
        style={{ color: "var(--node-start)", marginBottom: 3 }}
      >
        Start
      </div>
      <div className="base-node__label">{data.label || "Start"}</div>
      {data.metadata?.length > 0 && (
        <div className="base-node__sub">
          {data.metadata.length} metadata field
          {data.metadata.length > 1 ? "s" : ""}
        </div>
      )}
    </BaseNode>
  );
}

export default memo(StartNode);
