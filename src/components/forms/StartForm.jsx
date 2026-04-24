import KeyValueEditor from './KeyValueEditor'

function StartForm({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label">Start Title *</label>
        <input
          className="form-input"
          value={data.label || ''}
          onChange={(e) => onChange({ label: e.target.value })}
          placeholder="e.g. Onboarding Start"
        />
      </div>

      <KeyValueEditor
        label="Metadata (optional)"
        pairs={data.metadata || []}
        onChange={(metadata) => onChange({ metadata })}
      />
    </>
  )
}

export default StartForm
