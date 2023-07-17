import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DESCENDING_SORTING_ORDER = "descending";
const ASCENDING_SORTING_ORDER = "ascending";

/**
 * The `SortButton` component is a button that allows users to sort an array of items in either
 * ascending or descending order based on their names.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `SortButton` component. It may include the following properties:
 * @returns The SortButton component is returning a button element with a className of "sortIcon". The
 * button has an onClick event handler that calls the sortItems function. Inside the button, there is a
 * conditional rendering based on the sortingOrder state. If the sortingOrder is
 * DESCENDING_SORTING_ORDER, it renders a FontAwesomeIcon with the faArrowDownAZ icon and a color of
 * "#1a2b4
 */
const SortButton = (props) => {
    const [sortingOrder, setSortingOrder] = useState(DESCENDING_SORTING_ORDER);

    /**
     * The function `sortItems` sorts an array of items in either ascending or descending order based
     * on their names.
     */
    const sortItems = () => {
        const updatedItems = [...props.items];
        if (sortingOrder === DESCENDING_SORTING_ORDER) {
            updatedItems.sort((a, b) => a.name.localeCompare(b.name));
            setSortingOrder(ASCENDING_SORTING_ORDER);
        } else {
            updatedItems.sort((a, b) => b.name.localeCompare(a.name));
            setSortingOrder(DESCENDING_SORTING_ORDER);
        }
        props.setItems(updatedItems);
    };

    return (
        <button className="sortIcon" onClick={sortItems}>
            {sortingOrder === DESCENDING_SORTING_ORDER ? (
                <FontAwesomeIcon
                    icon={faArrowDownAZ}
                    style={{ color: "#1a2b4e" }}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faArrowUpZA}
                    style={{ color: "#1a2b4e" }}
                />
            )}
        </button>
    );
};

export default SortButton;
