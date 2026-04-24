import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import './nodes.css'

function BaseNode({
  children,
  nodeType,
  color,
  icon,
  selected,
  hasSource = true,
  hasTarget = true,
}) {
  return (
    <div
      className={`base-node base-node--${nodeType} ${selected ? 'base-node--selected' : ''}`}
      style={{ '--node-color': color }}
    >
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: color, borderColor: 'var(--bg)' }}
        />
      )}

      <div className="base-node__header">
        <span className="base-node__icon">{icon}</span>
      </div>

      <div className="base-node__body">{children}</div>

      {hasSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: color, borderColor: 'var(--bg)' }}
        />
      )}
    </div>
  )
}

export default memo(BaseNode)
