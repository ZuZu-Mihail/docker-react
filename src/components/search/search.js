import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = (props) => {
    return (
        <div className="searchInput">
            <input
                className="searchBar"
                placeholder="Search for tasks..."
                value={props.searchValue}
                onChange={props.handleOnChangeSearch}
            ></input>
            <FontAwesomeIcon
                className="searchIcon"
                icon={faMagnifyingGlass}
                style={{ color: "#1a2b4e" }}
            />
        </div>
    );
};

export default Search;
