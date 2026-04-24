function EndForm({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label">End Message</label>
        <textarea
          className="form-textarea"
          value={data.endMessage || ''}
          onChange={(e) => onChange({ endMessage: e.target.value })}
          placeholder="e.g. Onboarding workflow complete."
        />
      </div>

      <div className="form-group">
        <label className="form-toggle">
          <input
            type="checkbox"
            checked={!!data.summaryFlag}
            onChange={(e) => onChange({ summaryFlag: e.target.checked })}
          />
          <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>
            Generate summary report
          </span>
        </label>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          If enabled, a summary PDF is generated on completion.
        </span>
      </div>
    </>
  )
}

export default EndForm
