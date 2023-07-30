import { React, useState, useEffect } from "react";
import "./App.css";
import ItemProvider from "./providers/itemProvider/provider";
import Input from "./components/input/input";
import Tabel from "./components/tabel/tabel";


import { Container, Button } from "react-bootstrap";

import Cookies from "universal-cookie";



const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");
// const userCookies = cookies.get("UserName");

const logout = () => {
    // destroy the cookie
    cookies.remove("UserMail", { path: "/" });
    cookies.remove("UserName", { path: "/" });
    cookies.remove("UserRole", { path: "/" });
    window.location.href = "/auth/";
}

const Home = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
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
                    cookies.set("UserRole", data.role, {
                        path: "/",
                    });
                    // console.log(data.name);
                    setMessage(data.name + ", You are logged in with your email address " + mailCookies);
                })
                .catch((err) => {
                    console.log(err.message);
                }
                )
        } else {
            // <Navigate to="/auth/" />
            setMessage("as a guest u should not seing this, it will redirect you to the auth page");
            window.location.href = "/auth/";
        }


    }, []);

    return (
        <>
            <Container >
                <h3 className="text-center text-danger">{message}</h3>

            </Container>

                <ItemProvider>
                    <div className="app">
                        <h1 className="title">Tasks List</h1>
                        <Input />

                        <Tabel />

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