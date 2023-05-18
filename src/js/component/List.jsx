import React from "react";
import PropTypes from "prop-types";

const ListItem = (props) => {
    const handleDelete = () => {
        props.deleteListItem(props.listItem);
    };

    return (
        <li className="list">
            {props.listItem}{" "}
            <button className="bttn" onClick={handleDelete}>X</button>{" "}
        </li>
    );
};

ListItem.propTypes = {
    listItem: PropTypes.string.isRequired,
    deleteListItem: PropTypes.func.isRequired
};

export default ListItem;
