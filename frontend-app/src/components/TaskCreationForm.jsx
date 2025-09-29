import * as api from "../../api";

export default function TaskCreationForm({ setTasksChangedFlag }) {
  return (
    <div className="task-creation-form">
      <h2>Create New Task:</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { title, description, status, dueDate } = e.target;
          api
            .postTask({
              title: title.value,
              description: description.value,
              status: status.value,
              due_date: dueDate.value,
            })
            .then(() => {
              setTasksChangedFlag(true);
            });
        }}
      >
        <label htmlFor="title">Title</label>
        <input id="title" type="text" required />
        <label htmlFor="description">Description</label>
        <textarea id="description"  />

        <label htmlFor="todo">TODO</label>
        <input
          type="radio"
          id="todo"
          name="status"
          value="TODO"
          defaultChecked
        />
        <label htmlFor="in-progress">IN PROGRESS</label>
        <input
          type="radio"
          id="in-progress"
          name="status"
          value="IN PROGRESS"
        />
        <label htmlFor="completed">COMPLETED</label>
        <input type="radio" id="completed" name="status" value="COMPLETED" />
        <br />
        <input type="date" id="dueDate" required />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
