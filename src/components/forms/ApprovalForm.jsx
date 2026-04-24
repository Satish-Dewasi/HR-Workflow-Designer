const APPROVER_ROLES = ['Manager', 'HRBP', 'Director', 'VP HR', 'Legal', 'Finance']

function ApprovalForm({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          value={data.label || ''}
          onChange={(e) => onChange({ label: e.target.value })}
          placeholder="e.g. Manager Approval"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Approver Role</label>
        <select
          className="form-select"
          value={data.approverRole || 'Manager'}
          onChange={(e) => onChange({ approverRole: e.target.value })}
        >
          {APPROVER_ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Auto-Approve Threshold</label>
        <input
          className="form-input"
          type="number"
          min={0}
          value={data.autoApproveThreshold ?? 0}
          onChange={(e) => onChange({ autoApproveThreshold: Number(e.target.value) })}
          placeholder="0 = disabled"
        />
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
          Requests below this value auto-approve. 0 = always manual.
        </span>
      </div>
    </>
  )
}

export default ApprovalForm
