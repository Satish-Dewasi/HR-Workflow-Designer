import StartNode    from './StartNode'
import TaskNode     from './TaskNode'
import ApprovalNode from './ApprovalNode'
import AutoNode     from './AutoNode'
import EndNode      from './EndNode'

// Passed directly to ReactFlow's nodeTypes prop.
// Defined outside component to avoid re-renders (React Flow requirement).
const nodeTypes = {
  startNode:    StartNode,
  taskNode:     TaskNode,
  approvalNode: ApprovalNode,
  autoNode:     AutoNode,
  endNode:      EndNode,
}

export default nodeTypes
