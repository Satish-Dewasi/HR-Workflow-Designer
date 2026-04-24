import { memo } from "react";
import BaseNode from "./BaseNode";
import { CircleDot } from "lucide-react";

function EndNode({ data, selected }) {
  return (
    <BaseNode
      nodeType="end"
      color="var(--node-end)"
      icon={<CircleDot />}
      selected={selected}
      hasSource={false}
    >
      <div
        className="base-node__type-badge"
        style={{ color: "var(--node-end)", marginBottom: 3 }}
      >
        End
      </div>
      <div className="base-node__label">{data.label || "End"}</div>
      {data.endMessage && (
        <div className="base-node__sub">"{data.endMessage}"</div>
      )}
      {data.summaryFlag && (
        <div
          className="base-node__badge"
          style={{ "--node-color": "var(--node-end)" }}
        >
          Summary On
        </div>
      )}
    </BaseNode>
  );
}

export default memo(EndNode);
