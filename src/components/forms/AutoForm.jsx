import { useGetAutomationsQuery } from "../../api/workflowApi";

function AutoForm({ data, onChange }) {
  const {
    data: automations = [],
    isLoading,
    isError,
  } = useGetAutomationsQuery();

  const selectedAction = automations.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId) => {
    onChange({
      actionId,
      actionParams: {},
      label: automations.find((a) => a.id === actionId)?.label || data.label,
    });
  };

  const handleParamChange = (param, value) => {
    onChange({ actionParams: { ...data.actionParams, [param]: value } });
  };

  return (
    <>
      <div className="form-group">
        <label className="form-label">Step Title *</label>
        <input
          className="form-input"
          value={data.label || ""}
          onChange={(e) => onChange({ label: e.target.value })}
          placeholder="e.g. Send Welcome Email"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Action</label>
        {isLoading && (
          <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
            Loading actions…
          </div>
        )}
        {isError && (
          <div style={{ color: "var(--node-end)", fontSize: 13 }}>
            {" "}
            Could not load. Is JSON Server running?
          </div>
        )}
        {!isLoading && !isError && (
          <select
            className="form-select"
            value={data.actionId || ""}
            onChange={(e) => handleActionChange(e.target.value)}
          >
            <option value="">— Select an action —</option>
            {automations.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction?.params?.length > 0 && (
        <div className="auto-params">
          <div className="form-label" style={{ marginBottom: 8 }}>
            Action Parameters
          </div>
          {selectedAction.params.map((param) => (
            <div className="form-group" key={param}>
              <label className="form-label">{param}</label>
              <input
                className="form-input"
                value={data.actionParams?.[param] || ""}
                onChange={(e) => handleParamChange(param, e.target.value)}
                placeholder={`Enter ${param}…`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AutoForm;
