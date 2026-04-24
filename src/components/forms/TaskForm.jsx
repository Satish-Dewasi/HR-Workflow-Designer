import KeyValueEditor from './KeyValueEditor'

function TaskForm({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          value={data.label || ''}
          onChange={(e) => onChange({ label: e.target.value })}
          placeholder="e.g. Collect Documents"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="What does this task involve?"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Assignee</label>
        <input
          className="form-input"
          value={data.assignee || ''}
          onChange={(e) => onChange({ assignee: e.target.value })}
          placeholder="e.g. HR Coordinator"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          className="form-input"
          type="date"
          value={data.dueDate || ''}
          onChange={(e) => onChange({ dueDate: e.target.value })}
        />
      </div>

      <KeyValueEditor
        label="Custom Fields (optional)"
        pairs={data.customFields || []}
        onChange={(customFields) => onChange({ customFields })}
      />
    </>
  )
}

export default TaskForm
