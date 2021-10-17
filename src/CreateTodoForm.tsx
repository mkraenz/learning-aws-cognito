import API from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { FC, useEffect, useState } from "react";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

interface Props {}

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px"
  }
} as const;

const initialForm = { name: "", description: "" };

const CreateTodoForm: FC<Props> = props => {
  const [form, setForm] = useState(initialForm);
  const [todos, setTodos] = useState<any[]>([]);

  const setInput = <T extends keyof typeof initialForm>(
    key: T,
    val: typeof initialForm[T]
  ) => {
    setForm({ ...form, [key]: val });
  };

  const addTodo = () => {
    try {
      if (!form.name || !form.description) return;
      const todo = { ...form };
      setTodos([...todos, todo]);
      setForm(initialForm);
      API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodos(setTodos);
  }, [setTodos]);
  return (
    <div style={styles.container}>
      <h1>Todos</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setInput("name", e.target.value)}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={e => setInput("description", e.target.value)}
      />
      <button onClick={addTodo} disabled={!form.name || !form.description}>
        Add Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

const fetchTodos = async (setTodos: (items: any) => void) => {
  try {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    const todos = (todoData as any).data.listTodos.items;
    setTodos(todos);
  } catch (error) {
    console.error(error);
  }
};

export default CreateTodoForm;
