import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DESCENDING_SORTING_ORDER = "descending";
const ASCENDING_SORTING_ORDER = "ascending";

const SortButton = (props) => {
    const [sortingOrder, setSortingOrder] = useState(DESCENDING_SORTING_ORDER);

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
