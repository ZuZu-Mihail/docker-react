import { React, useRef, useState, useEffect } from "react";
import "./App.css";
import ItemProvider from "./providers/itemProvider/provider";
import Input from "./components/input/input";
import Tabel from "./components/tabel/tabel";
import { Navigate } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");
const userCookies = cookies.get("UserName");

const logout = () => {
    // destroy the cookie
    cookies.remove("UserMail", { path: "/" });
    cookies.remove("UserName", { path: "/" });
    window.location.href = "/auth/";
}

const Home = () => {

    const [backgroundColor, setBackgroundColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const counter = useRef(0);
    const incrementCounter = () => {
        counter.current++;
        if (counter.current === 10) {
            setBackgroundColor(`rgb(27,44,78)`);
            setTextColor(`rgb(255,255,255)`);
            counter.current = 0;
        }
    };
    const [message, setMessage] = useState("");

    useEffect(() => {
        {
            if (mailCookies) {


                fetch("http://localhost:4000/users/email/" + mailCookies, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        cookies.set("UserName", data.name, {
                            path: "/",
                        });
                        setMessage(data.name + ", You are logged in with your email address " + mailCookies);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    }
                    )
            } else {
                <Navigate to="/auth/" />
            }
        }

    }, [mailCookies]);

    return (
        <>
            <Container >
                <h3 className="text-center text-danger">{message}</h3>

            </Container>
            <ItemProvider>
                <div className="app">
                    <h1 className="title">Tasks List</h1>
                    <Input
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    />
                    <Tabel incrementCounter={incrementCounter} />
                </div>
            </ItemProvider>
            <div className="col-md-12 text-center">
                <Button type="submit" variant="danger" onClick={() => logout()}>
                    Logout
                </Button>
            </div>
        </>
    );
};

export default Home;