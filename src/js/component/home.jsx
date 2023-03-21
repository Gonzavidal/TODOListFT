import React, { useState, useEffect } from "react";
import List from "./List.jsx";

const Home = () => {
  const [task, setTask] = useState({label: "", done: false, });
  const [list, setList] = useState([]);
  console.log("list", list);


  const handleChange = (event) => {
    setTask({label: event.target.value, done: false,});
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      });
  }

  const createList = (list) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(list),
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setList([...list, task]);
    createList([...list, task]);
    setTask({label: "",done: false,
    });
  };

  const onDelete = (item) => {
    const filteredTodoList = list.filter((todoItem) => {
      return todoItem.label !== item.label;
    });
    fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(filteredTodoList),
    });

    const deleteAll = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/gonzavidal", {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify([{}]),
      });
      setList([]);
    };

    return (
      <div className="form">
        <h1 className="title">todos</h1>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="What needs to be done?"
            value={task}
            onChange={handleChange}
          />
        </form>

        {list.map((item, index) => {
          return <List ListItem={item} deleteList={onDelete} key={index} />;
        })}

      </div>
    );
  };
};
export default Home;
