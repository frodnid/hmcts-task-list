import * as api from "../../api";

export default function StatusSelector({
  task,
  setTasksChangedFlag,
  setIsVisible,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formValue = e.target["status-select"].value;
        if (formValue === task.status) return;
        api.patchStatus(task.task_id, formValue).then(() => {
          setIsVisible(false);
          setTasksChangedFlag(true);
        });
      }}
    >
      <label htmlFor="status-select">Choose status:</label>
      <select name="status-select" id="status-select">
        <option value="TODO">TODO</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <input type="submit" />
    </form>
  );
}
