import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../../providers/itemProvider/provider";
import "./tabel.css";
import Item from "./item";
import Search from "../search/search";
import SortButton from "../sortButton/sortButton";

function Tabel(props) {
    const { items, setItems } = useContext(ItemContext);
    const [searchValue, setSearchValue] = useState("");
    const [circleColor, setCircleColor] = useState("#1b2c4e");

    useEffect(() => {
        let red = Math.random() * 255;
        let green = Math.random() * 255;
        let blue = Math.random() * 255;
        setCircleColor(`rgb(${red},${green},${blue})`);
    }, [items]);

    const handleCheckboxChange = (id) => {
        props.incrementCounter();
        const updateditems = items.map((item) =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updateditems);
    };

    function handleOnChangeSearch(event) {
        setSearchValue(event.target.value);
    }

    let filteredItems = items
        .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item) => (
            <Item
                key={item.id}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                setItems={setItems}
                items={items}
            />
        ));

    return (
        <>
            {/* YOU CAN IGNORE THAT, aveam erori de docking si ma plictiseam 
             <div>
                <span className="unwantedText">
                    I didn't want to put this circle here, but here you go:
                </span>
            </div>
            <div
                className="randomCircleIAmRequiredToDisplay"
                style={{ backgroundColor: circleColor }}
            ></div> */}
            <table className="itemsTable">
                <thead className="tabelHead">
                    <tr>
                        <th className="tabelHeadID">ID</th>
                        <th className="tabelHeadItem">
                            <span className="item">Task</span>
                            <Search
                                searchValue={searchValue}
                                handleOnChangeSearch={(e) =>
                                    handleOnChangeSearch(e)
                                }
                            />
                            <SortButton items={items} setItems={setItems} />
                            <div></div>
                        </th>
                        <th className="tabelHeadFinished">Finished</th>
                        <th className="tableHeadRemove">Remove?</th>
                    </tr>
                </thead>
                <tbody>{filteredItems}</tbody>
            </table>
        </>
    );
}

export default Tabel;
