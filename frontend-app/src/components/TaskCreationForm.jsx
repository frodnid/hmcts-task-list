import axios from "axios";

export default function TaskCreationForm() {
  return (
    <>
      <h2>Create New Task:</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { title, description, status, dueDate } = e.target;
          return axios.post("http://localhost:9090/api/tasks", { 
            title: title.value,
            description: description.value,
            status: status.value,
            due_date: dueDate.value
          })
        }}
      >
        <label htmlFor="title">Title</label>
        <input id="title" type="text" required/>
        <label htmlFor="description">Description</label>
        <input id="description" type="text" />

        <input type="radio" id="todo" name="status" value="TODO" defaultChecked/>
        <label htmlFor="todo">TODO</label>
        <br />
        <input type="radio" id="in-progress" name="status" value="IN PROGRESS" />
        <label htmlFor="in-progress">IN PROGRESS</label>
        <br />
        <input
          type="radio"
          id="completed"
          name="status"
          value="COMPLETED"
        />
        <label htmlFor="completed">COMPLETED</label>

        <input type="date" id="dueDate" />

        <input type="submit" />
      </form>
    </>
  );
}
