import React from "react";
import "./item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Item = (props) => {
    /**
     * The `handleDelete` function filters out the item with a specific id from the `props.items` array and
     * updates the `props.setItems` function with the filtered array.
     */
    const handleDelete = () => {
        const filteredItems = props.items.filter(
            (item) => item._id !== props.item._id
        );
        // console.log(props.item._id);
        fetch("http://localhost:4000/tasks/" + props.item._id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => {
                console.log(err.message);
            });
        props.setItems(filteredItems);
    };

    return (
        <>
            <tr>
                {/* <td>
                    {props.item._id}
                </td> */}
                <td>
                    <span
                        className={`itemContent ${props.item.isChecked ? "crossed" : ""
                            }`}
                    >

                        {props.item.name}
                    </span>
                </td>
                <td>
                    <input
                        type="checkbox"
                        checked={props.item.isChecked}
                        onChange={() =>
                            props.handleCheckboxChange(props.item._id)
                        }
                    />
                </td>
                <td>
                    {/* <button className="sortIcon">
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "#1a2b4e" }}
                            onClick={handleDelete}
                        />
                    </button> */}
                    <Button variant="danger" className="btn-close" onClick={handleDelete}></Button>
                </td>
            </tr>
        </>
    );
};

export default Item;
