import React, { useState, useContext } from "react";
import { ItemContext } from "../../providers/itemProvider/provider";
import "./input.css";

function Input(props) {
    const { items, setItems } = useContext(ItemContext);
    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleAddItem() {
        if (inputValue.trim() !== "") {
            setItems([
                ...items,
                {
                    id: items.length + 1,
                    name: inputValue,
                    isChecked: false,
                },
            ]);
            setInputValue("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddItem();
        }
    };

    return (
        <div className="inputContainer">
            <label className="inputPromt" htmlFor="input-field">
                Add a new task for your colleagues
            </label>
            <br />
            <input
                style={{
                    backgroundColor: props.backgroundColor,
                    color: props.textColor,
                }}
                type="text"
                id="input-field"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className="addItemButton" onClick={handleAddItem}>
                Add task
            </button>
        </div>
    );
}

export default Input;
