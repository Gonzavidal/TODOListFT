import React from "react"

const ListItem = (props) => {
    const handleDelete = () => {
        props.deleteList(props.ListItem);
    };

    return ( // ERROR CONSOLA
        <li className="list">{props.ListItem}{" "}
            <button className="bttn" onClick={handleDelete}>X
            </button>{" "}
        </li>
    );
};

export default ListItem;