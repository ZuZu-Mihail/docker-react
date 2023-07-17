import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../../providers/itemProvider/provider";
import "./tabel.css";
import Item from "./item";
import Search from "../search/search";
import SortButton from "../sortButton/sortButton";

/**
 * The `Tabel` function is a React component that renders a table of items, with the ability to search
 * and sort the items.
 * @param props - The `props` parameter is an object that contains the properties passed to the `Tabel`
 * component. These properties can be accessed using dot notation, such as `props.propertyName`.
 * @returns The `Tabel` component is returning a JSX element. It includes a table with a header and a
 * body. The header contains four columns: ID, Task, Finished, and Remove?. The body contains the
 * filtered items mapped to `Item` components.
 */
function Tabel(props) {
    const { items, setItems } = useContext(ItemContext);
    const [searchValue, setSearchValue] = useState("");
    const [circleColor, setCircleColor] = useState("#1b2c4e");

    /* The `useEffect` hook in React is used to perform side effects in functional components. It takes
    two arguments: a function and a dependency array. */
    useEffect(() => {
        let red = Math.random() * 255;
        let green = Math.random() * 255;
        let blue = Math.random() * 255;
        setCircleColor(`rgb(${red},${green},${blue})`);
    }, [items]);

    /* The `handleCheckboxChange` function is responsible for handling the change event when a
    checkbox is clicked. It takes the `id` of the item as a parameter. */
    const handleCheckboxChange = (id) => {
        props.incrementCounter();
        const updateditems = items.map((item) =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updateditems);
    };

    /**
     * The function "handleOnChangeSearch" updates the search value based on the input value of an
     * event.
     * @param event - The event parameter is an object that represents the event that triggered the
     * onChange event handler. It contains information about the event, such as the target element that
     * triggered the event. In this case, the target element is the input field where the user is
     * typing their search query.
     */
    function handleOnChangeSearch(event) {
        setSearchValue(event.target.value);
    }

/* The code is filtering the `items` array based on the `searchValue` and then mapping over the
filtered items to create an array of `Item` components. */
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
