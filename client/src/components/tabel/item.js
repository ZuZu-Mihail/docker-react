import React from "react";
import "./item.css";

import { useState } from "react";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");

function formatDate(date) {
    const currentMonth = date.getMonth();
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${currentDate}-${monthString}-${date.getFullYear()}`;
}

let usernameCookies;
let roleCookies;

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

    const handleTake = () => {

        fetch("http://localhost:4000/tasks/" + props.item._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: usernameCookies
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
    }


    const handleRemoveAssign = () => {

        fetch("http://localhost:4000/tasks/" + props.item._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: null
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
    }
    fetch("http://localhost:4000/users/email/" + mailCookies, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            usernameCookies = data.name;
            roleCookies = data.role;
        })
        .catch((err) => {
            console.log(err.message);
        }
        )


    // if (props.item.assigned === null) {
    //     setassigned(false);
    // }

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
                    {formatDate(new Date(props.item.created))}
                </td>
                <td className="assigned">
                    {/* {assigned ?
                        <span className="assignedContent">
                            {props.item.assigned}
                        </span>
                        :
                        <span className="assignedContent">
                            Not assigned
                        </span>

                    } */}
                    <span className="assignedContent">
                        {/* {props.item.assigned ? props.item.assigned : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>} */}
                        {roleCookies === "admin" ? props.item.assigned ?
                            <Button variant="danger" type="submit" onClick={handleRemoveAssign}>{props.item.assigned}</Button> : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button> :
                            props.item.assigned ? props.item.assigned : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>

                        }
                    </span>
                </td>


                <td>
                    {(props.item.assigned === usernameCookies) || (roleCookies === "admin") ?
                        <input
                            type="checkbox"
                            checked={props.item.isChecked}
                            onChange={() =>
                                props.handleCheckboxChange(props.item._id)
                            }
                        /> : <input
                            type="checkbox"
                            disabled
                            checked={props.item.isChecked}
                            onChange={() =>
                                props.handleCheckboxChange(props.item._id)
                            }
                        />
                    }
                </td>
                <td>
                    {/* <button className="sortIcon">
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "#1a2b4e" }}
                            onClick={handleDelete}
                        />
                    </button> */}

                    {roleCookies === "admin" ?
                        (
                            <Button variant="danger" className="btn-close" onClick={handleDelete}></Button>
                        ) : (
                            <Button variant="danger" className="btn-close" onClick={handleDelete} disabled></Button>
                        )}


                </td>
            </tr>
        </>
    );
};

export default Item;
