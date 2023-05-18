import React, { useState, useEffect } from "react";
import List from "./List.jsx";

const Home = () => {
  const [task, setTask] = useState({ label: "", done: false });
  const [list, setList] = useState([]);

  const handleChange = (event) => {
    setTask({ label: event.target.value, done: false });
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setList(data);
      });
  };

  const createList = (list) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedList = [...list, task];
    setList(updatedList);
    createList(updatedList); // Descomentar esta línea si la API lo permite
    setTask({ label: "", done: false });
  };

  const onDelete = (item) => {
    const filteredTodoList = list.filter((todoItem) => {
      return todoItem.label !== item.label;
    });
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredTodoList),
    });

    setList(filteredTodoList);
  };

  const deleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => setList([]))
      .catch((error) => console.log(error));
  };

  return (
    <div className="form">
      <h1 className="title">todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={task.label}
          onChange={handleChange}
        />
      </form>
      <button onClick={deleteAll}>Delete All Entries</button>
      {list.map((item, index) => (
        <List listItem={item.label} deleteListItem={onDelete} key={index} />
      ))}
    </div>
  );
};

export default Home;
