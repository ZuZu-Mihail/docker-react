import React from "react";
import "./item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
    const handleDelete = () => {
        const filteredItems = props.items.filter(
            (item) => item.id !== props.item.id
        );
        props.setItems(filteredItems);
    };

    return (
        <>
            <tr>
                <td>
                    {props.item.id}
                </td>
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
                            props.handleCheckboxChange(props.item.id)
                        }
                    />
                </td>
                <td>
                    <button className="sortIcon">
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "#1a2b4e" }}
                            onClick={handleDelete}
                        />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Item;
