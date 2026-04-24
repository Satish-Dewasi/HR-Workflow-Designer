import { memo } from "react";
import BaseNode from "./BaseNode";
import { Signature } from "lucide-react";

function ApprovalNode({ data, selected }) {
  return (
    <BaseNode
      nodeType="approval"
      color="var(--node-approval)"
      icon={<Signature />}
      selected={selected}
    >
      <div
        className="base-node__type-badge"
        style={{ color: "var(--node-approval)", marginBottom: 3 }}
      >
        Approval
      </div>
      <div className="base-node__label">{data.label || "Approval"}</div>
      {data.approverRole && (
        <div className="base-node__badge">{data.approverRole}</div>
      )}
      {data.autoApproveThreshold > 0 && (
        <div className="base-node__sub" style={{ marginTop: 5 }}>
          Auto ≥ {data.autoApproveThreshold}
        </div>
      )}
    </BaseNode>
  );
}

export default memo(ApprovalNode);
