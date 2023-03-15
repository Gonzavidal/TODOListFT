import React, { useState } from "react";
import List from "./List.jsx";

const Home = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  
  
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const underKeyDown = (event) => {
    if (event.key === "enter"){
      onSubmit()
    }
  };

  console.log(underKeyDown)

  const onSubmit = (event) => {
    event.preventDefault();
    setList([...list, task]);
    setTask("");
  };

  const onDelete = (item) => {
    const filteredList = list.filter((listItem) => {
      return listItem !== item;
    });
    setList(filteredList);
  };

  return (
    <div className="form">
      <h1 className="title">todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What needs to be done?"
          value={task}
          onChange={handleChange}
          onKeyDown={underKeyDown}
        />
      </form>
      <ul>
        {list.map((item, index) => {
          return <List listItem={item} deleteList={onDelete} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
