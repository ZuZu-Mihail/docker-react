import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';

// import { BsArrowLeft } from "bootstrap-icons";

import "./singleTask.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");
let usernameCookies;
// const usernameCookies = cookies.get("UserName");
// const roleCookies = cookies.get("UserRole");

const roleCookiesOrigin = cookies.get("UserRole");

function useInterval(callback, delay) {
    const savedCallback = useRef();



    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function SingleTask() {

    const [roleCookies, setRoleCookies] = useState(roleCookiesOrigin);

    const { id } = useParams();
    function formatDate(date) {
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        // const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${currentDate}-${monthString}-${date.getFullYear()}`;
    }

    const [nameTask, setNameTask] = useState("");
    const [descriptionTask, setDescriptionTask] = useState("");
    const [dateTask, setDateTask] = useState(Date.now());
    const [isCheckedTask, setisCheckedTask] = useState(false);
    const [assignedTask, setassignedTask] = useState(null);
    const [status, setStatus] = useState("Not Started");

    var curr = new Date();
    curr.setDate(curr.getDate()+1);
    var date = curr.toISOString().substring(0, 10);

    const [deadlineTask, setDeadline] = useState(date);

    function defaultDedline(curr) {
        if (curr === null)
            return "";
        curr = new Date(curr);
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substring(0, 10);
        return date;
    }

    /* The above code is using the `useInterval` function to repeatedly execute a block of code every
    1000 milliseconds (1 second). */
    useInterval(() => {
        /* The above code is making a GET request to the URL "http://localhost:4000/tasks/" + id, where "id" is
        a variable representing the task ID. It is setting the "Content-Type" header to "application/json". */
        fetch("http://localhost:4000/tasks/" + id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {


                /* The above code is making a GET request to the "http://localhost:4000/users/email/" endpoint with the
                value of the "mailCookies" variable appended to the URL. It is setting the "Content-Type" header to
                "application/json". */
                fetch("http://localhost:4000/users/email/" + mailCookies, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        usernameCookies = data.name;
                        setRoleCookies(data.role);
                        cookies.set("UserRole", roleCookies, {
                            path: "/",
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    }
                    )
                setNameTask(data.name);
                setDescriptionTask(data.description);
                setDateTask(formatDate(new Date(data.created)));
                setisCheckedTask(data.isChecked);
                setassignedTask(data.assigned);
                setStatus(data.status);
                setDeadline(data.deadline);

            })
            .catch((err) => {
                console.log(err.message);
            });



    }, 1000);
    useEffect(() => {
        document.body.classList.add('bodyTask');

        return () => {
            document.body.classList.remove('bodyTask');
        };
    });

    const handleRemoveAssign = () => {

        fetch("http://localhost:4000/tasks/" + id, {
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

    const handleTake = () => {

        fetch("http://localhost:4000/tasks/" + id, {
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

    const handleCheckboxChange = (string) => {
        const _id = string;

        /* The `map` function is used to create a new array based on the `items` array. It iterates over
        each item in the `items` array and returns a new array with the same number of items. */

        const status = !isCheckedTask;


        fetch("http://localhost:4000/tasks/" + _id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isChecked: status
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleDelete = () => {

        fetch("http://localhost:4000/tasks/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => {
                console.log(err.message);
            });
        window.location.href = "/";
    };

    const [showEdit, SetshowEdit] = useState(false);
    const handleEdit = () => {
        SetshowEdit(!showEdit);
    }

    const [nameTempTask, setTempNameTask] = useState(nameTask);
    const [descriptionTempTask, setTempDescriptionTask] = useState(descriptionTask);
    function handleInputTitle(event) {
        setTempNameTask(event.target.value);
    }
    function handleInputDesc(event) {
        setTempDescriptionTask(event.target.value);
    }
    
    const [tempDeadline, setTempDeadline] = useState(deadlineTask);
    function handleInputDDLChange(event) {
        if (event.target.value !== "") {
            if (new Date(event.target.value) < new Date()) {
                alert("You cannot set a deadline in the past");
                var curr = new Date();
                curr.setDate(curr.getDate() + 1);
                var date = curr.toISOString().substring(0, 10);
                setTempDeadline(date);
            }
            else
                setTempDeadline(event.target.value);
        }
        else {
            setTempDeadline(null);
        }
    }

    const onSelect = (eventKey, event) => {
        event.preventDefault();
        event.persist();
        event.stopPropagation();
        console.log(eventKey) // selected event will trigger

        fetch("http://localhost:4000/tasks/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: eventKey
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });

    }

    return (
        <>
            <div className="SingleTask">
                <div className="img_pod">

                    <Link to="/" ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg></Link>
                </div>
                <div className="container_copy">


                    <h3 className="singleTask__date">Task Date: {dateTask}</h3>
                    <h3 className="singleTask__deadline">
                        {deadlineTask < Date.now ? ("Task deadline: " + formatDate(new Date(deadlineTask))) : "Deadline depăsit/Nesetat"}
                    </h3>
                    <h1 className="singleTask__title">{nameTask}</h1>
                    <p className="singleTask__description">{descriptionTask}</p>
                    {/* <h3>Task Status:  {isCheckedTask === false ? ('Not Completed') : ('Completed')}</h3> */}

                    <label className="singleTask__label" htmlFor="isCheckedTask">Status:</label>

                    {/* {(assignedTask === usernameCookies) || (roleCookies === "admin") ? */}
                    {(roleCookies === "admin") ?
                        (<>
                            <input
                                type="checkbox"
                                name="isCheckedTask"
                                checked={isCheckedTask}
                                onChange={() =>
                                    handleCheckboxChange(id)
                                }
                            />

                            <i> {isCheckedTask === false ? ('Not Completed') : ('Completed')}</i>

                        </>
                        ) : (<>
                            <input
                                type="checkbox"
                                name="isCheckedTask"
                                disabled
                                checked={isCheckedTask}
                            /> {isCheckedTask === false ? ('Not Completed') : ('Completed')}
                        </>
                        )
                    }
                    {assignedTask === null ? (
                        <h3>Task Assigned: none</h3>
                    ) : (

                        <h3>Task Assigned: {assignedTask}</h3>
                    )}

                    <div className="singleTask__buttons">

                        {roleCookies === "admin" ? assignedTask ?
                            <Button variant="danger" type="submit" onClick={handleRemoveAssign}>{assignedTask}</Button> : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button> :
                            assignedTask ? "" : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>

                        }


                        {(assignedTask === usernameCookies) || (roleCookies === "admin") ?
                            <>
                                <Dropdown onSelect={onSelect}>
                                    <Dropdown.Toggle variant={status === "Not Started" ? "danger" : status === "In progress" ? "warning" : "success"} id="dropdown-basic" disabled={isCheckedTask}>
                                        {status ? status : "Not started"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                        <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item>
                                        <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </>
                            :
                            <>
                                <Dropdown onSelect={onSelect}>
                                    <Dropdown.Toggle variant={status === "Not Started" ? "danger" : status === "In progress" ? "warning" : "success"} id="dropdown-basic" disabled>
                                        {status ? status : "Not started"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                        <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item>
                                        <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </>
                        }

                        <br />
                        <br />



                        {roleCookies === "admin" ? (<>
                            <div className="adminZone">
                                <Button className="" variant="primary" onClick={handleEdit} >Edit</Button>
                                <Button className="" variant="danger" onClick={handleDelete} >Delete</Button>
                            </div>
                            <br />

                            {showEdit ? (
                                <>
                                    <br />
                                    <Form className="formAdmin">
                                        <Form.Group controlId="form">
                                            <Form.Label>Schimba titlul</Form.Label>
                                            <Form.Control type="text" placeholder="Enter new Title" defaultValue={nameTask} onChange={handleInputTitle} />
                                        </Form.Group>

                                        <Form.Group controlId="form">
                                            <Form.Label>Schimba descrierea</Form.Label>
                                            <Form.Control as="textarea" rows={4} cols={40} type="text" placeholder="Enter new Description" defaultValue={descriptionTask} onChange={handleInputDesc} />
                                        </Form.Group>

                                        <Form.Group controlId="ddl">
                                            <Form.Label >Change the deadline</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="ddl"
                                                placeholder={defaultDedline(deadlineTask)}
                                                // value={defaultDedline(deadlineTask)}
                                                onChange={handleInputDDLChange}

                                            />
                                        </Form.Group>



                                    </Form>
                                    <Button className="" variant="info" onClick={() => {
                                        fetch("http://localhost:4000/tasks/" + id, {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                name: nameTempTask,
                                                description: descriptionTempTask,
                                                deadline: tempDeadline

                                            }),
                                        })
                                            .catch((err) => {
                                                console.log(err.message);
                                            });
                                        SetshowEdit(!showEdit);
                                    }} >Save</Button>
                                    <br />
                                </>
                            ) : (
                                <></>
                            )}

                            <br />

                        </>) : (
                            <></>
                        )}
                    </div>

                </div>


            </div>

        </>
    );
}

export default SingleTask;