import { v4 as uuidv4 } from "uuid";

function KeyValueEditor({ pairs = [], onChange, label = "Custom Fields" }) {
  const addPair = () => {
    onChange([...pairs, { id: uuidv4(), key: "", value: "" }]);
  };

  const updatePair = (id, field, val) => {
    onChange(pairs.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const removePair = (id) => {
    onChange(pairs.filter((p) => p.id !== id));
  };

  return (
    <div className="kv-editor">
      <div className="form-label" style={{ marginBottom: 6 }}>
        {label}
      </div>
      {pairs.map((pair) => (
        <div key={pair.id} className="kv-row">
          <input
            className="form-input"
            placeholder="Key"
            value={pair.key}
            onChange={(e) => updatePair(pair.id, "key", e.target.value)}
          />
          <input
            className="form-input"
            placeholder="Value"
            value={pair.value}
            onChange={(e) => updatePair(pair.id, "value", e.target.value)}
          />
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removePair(pair.id)}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="btn btn-ghost btn-sm"
        onClick={addPair}
        style={{ marginTop: 4 }}
      >
        + Add {pairs.length === 0 ? "first" : "another"} field
      </button>
    </div>
  );
}

export default KeyValueEditor;
