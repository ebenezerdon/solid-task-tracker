import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { Component } from 'solid-js'

const App: Component = () => {
  type Task = {
    id: string
    text: string
    completed: boolean
  }

  const [taskList, setTaskList] = createStore([] as Task[])

  const addTask = (e: Event) => {
    e.preventDefault()

    const taskInput = document.querySelector('#taskInput') as HTMLInputElement

    const newTask: Task = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    }

    setTaskList([newTask, ...taskList])

    taskInput.value = ''
  }

  const deleteTask = (task: Task) => {
    setTaskList(taskList.filter((item) => item !== task))
  }

  const toggleStatus = (taskId: string) => {
    setTaskList(
      (task) => task.id === taskId,
      'completed',
      (completed) => !completed,
    )
  }

  return (
    <div class="container mt-5 text-center">
      <h1 class="mb-4">Whattodo!</h1>

      <form class="mb-5 row row-cols-2 justify-content-center">
        <input type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." id="taskInput" required />

        <button class="btn btn-primary ms-3 w-auto" type="submit" onclick={(e) => addTask(e)}>
          Add task
        </button>
      </form>

      <div>
        <h4 class="text-muted mb-4">Tasks</h4>
        <For each={taskList}>
          {(task: Task) => (
            <div class="row row-cols-3 mb-3 justify-content-center">
              <button class="btn btn-danger w-auto" onClick={() => deleteTask(task)}>
                X
              </button>
              <div class={`bg-light p-2 mx-2 ${task.completed && 'text-decoration-line-through'}`}>{task.text}</div>
              <input
                type="checkbox"
                checked={task.completed}
                role="button"
                class="form-check-input h-auto px-3"
                onClick={() => {
                  toggleStatus(task.id)
                }}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default App
