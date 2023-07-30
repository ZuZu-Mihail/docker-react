import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Cookies from "universal-cookie";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./auth2.css";

const cookies = new Cookies();

const logout = () => {
    // destroy the cookie
    cookies.remove("UserMail", { path: "/" });
    cookies.remove("UserName", { path: "/" });
    cookies.remove("UserRole", { path: "/" });
    window.location.href = "/auth/";
}

const mailCookies = cookies.get("UserMail");
const userCookies = cookies.get("UserName");

function Auth() {

    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [name, setName] = useState("");


    const handleSubmitLogin = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        fetch("http://localhost:4000/users/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((response) => response.json())
            .then((data) => {

                cookies.set("UserMail", email, {
                    path: "/",
                });

                setLogin(true);

                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err.message);
            });

    }


    const handleSubmitRegister = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();


        let mailTest = email;

        fetch("http://localhost:4000/users/email/" + mailTest, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    if (data.email === email) {
                        console.log(data.email + " from db");
                        console.log(email + " from form");
                        console.log(mailTest + " from test");
                        alert("Acest email exista deja:" + email);
                    }
                }
                else {
                    fetch("http://localhost:4000/users/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            setRegister(true);
                            console.log(data);
                            cookies.set("UserMail", email, {
                                path: "/",
                            });
                            cookies.set("UserName", name, {
                                path: "/",
                            });
                            window.location.href = "/";
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
            })
            .catch((err) => {
                console.log(err.message);
            }
            )
    }
    useEffect(() => {
        document.body.classList.add('body');

        return () => {
            document.body.classList.remove('body');
        };
    });

    useEffect(() => {

        if (mailCookies) {
            setMessage(userCookies + "You are already logged in with your email address " + mailCookies);
        }
        else {
            setMessage("");
        }
    }
        , []);


    return (
        <>

            {!mailCookies ? (
                <div class="d-flex justify-content-center align-items-center mt-5">
                    <div class="card">

                        <Tabs
                            defaultActiveKey="login"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="login" title="Login">
                                <div class="form px-4 pt-5">

                                    <Form onSubmit={(e) => handleSubmitLogin(e)}>
                                        {/* email */}
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email"
                                            />
                                        </Form.Group>

                                        {/* password */}
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                        </Form.Group>

                                        {/* submit button */}
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                    {Login ? (
                                        <p className="text-success">You Are Loged Successfully</p>
                                    ) : (
                                        <p className="text-danger">You Are Not Loged</p>
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="register" title="Register">
                                <div class="form px-4">
                                    <Form onSubmit={(e) => handleSubmitRegister(e)}>
                                        {/* name */}
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter name"
                                            />
                                        </Form.Group>
                                        {/* email */}
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email"
                                            />
                                        </Form.Group>

                                        {/* password */}
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                        </Form.Group>

                                        {/* submit button */}
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                    {register ? (
                                        <p className="text-success">You Are Registered Successfully</p>
                                    ) : (
                                        <p className="text-danger">You Are Not Registered</p>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>


                </div >



            ) : (
                <Container >
                    <h3 className="text-center text-danger">{message}</h3>
                    <div className="col-md-12 text-center">
                        <Button type="submit" variant="danger" onClick={() => logout()}>
                            Logout
                        </Button>
                    </div>
                </Container>
            )
            }
        </>
    );
}

export default Auth; 