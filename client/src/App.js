import { React, useRef, useState, useContext, useEffect } from "react";
import "./App.css";
import ItemProvider from "./providers/itemProvider/provider";
import Input from "./components/input/input";
import Tabel from "./components/tabel/tabel";

const App = () => {
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

    return (
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
    );
};

export default App;
