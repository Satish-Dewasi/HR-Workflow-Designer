import { ReactFlowProvider } from "reactflow";
import Sidebar from "./components/Sidebar/Sidebar";
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Canvas/Toolbar";
import NodeFormPanel from "./components/forms/NodeFormPanel";
import { useWorkflow } from "./hooks/useWorkflow";
import "./styles/global.css";
import "./App.css";

function Layout() {
  const { selectedNode } = useWorkflow();
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Toolbar />
        <div className="app-canvas-area">
          <Canvas />
          {selectedNode && <NodeFormPanel />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Layout />
    </ReactFlowProvider>
  );
}

export default App;
