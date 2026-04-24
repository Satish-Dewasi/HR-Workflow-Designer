import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import {
  setNodes, setEdges, addEdge, addNode,
  selectNode, deselectNode, updateNodeData,
  deleteNode, deleteEdge, clearWorkflow,
  selectNodes, selectEdges, selectSelectedId, selectSelectedNode,
} from '../store/slices/workflowSlice'

export function useWorkflow() {
  const dispatch = useDispatch()
  const nodes          = useSelector(selectNodes)
  const edges          = useSelector(selectEdges)
  const selectedNodeId = useSelector(selectSelectedId)
  const selectedNode   = useSelector(selectSelectedNode)

  const onNodesChange  = useCallback((changes) => dispatch(setNodes(applyNodeChanges(changes, nodes))), [dispatch, nodes])
  const onEdgesChange  = useCallback((changes) => dispatch(setEdges(applyEdgeChanges(changes, edges))), [dispatch, edges])
  const onConnect      = useCallback((conn)    => dispatch(addEdge(conn)),              [dispatch])
  const onDropNode     = useCallback((type, position) => dispatch(addNode({ type, position })), [dispatch])
  const onNodeClick    = useCallback((_, node) => dispatch(selectNode(node.id)),        [dispatch])
  const onPaneClick    = useCallback(()        => dispatch(deselectNode()),             [dispatch])
  const onDeselectNode = useCallback(()        => dispatch(deselectNode()),             [dispatch])
  const onUpdateNodeData = useCallback((nodeId, data) => dispatch(updateNodeData({ nodeId, data })), [dispatch])
  const onDeleteNode   = useCallback((nodeId)  => dispatch(deleteNode(nodeId)),         [dispatch])
  const onDeleteEdge   = useCallback((edgeId)  => dispatch(deleteEdge(edgeId)),         [dispatch])
  const onClearWorkflow= useCallback(()        => dispatch(clearWorkflow()),            [dispatch])

  return {
    nodes, edges, selectedNodeId, selectedNode,
    onNodesChange, onEdgesChange, onConnect,
    onDropNode, onNodeClick, onPaneClick,
    deselectNode: onDeselectNode,
    onUpdateNodeData, onDeleteNode, onDeleteEdge, onClearWorkflow,
  }
}
