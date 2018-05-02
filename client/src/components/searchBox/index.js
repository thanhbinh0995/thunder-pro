import React from 'react';

const SearchBox = ({styleName, placeholder, onChangeSearch, search}) => {
    return (
        <div className={`search-bar right-side-icon bg-transparent ${styleName}`}>
            <div className="form-group">
                <input className="form-control border-0" type="search" placeholder={placeholder} onChange={onChangeSearch}
                       value={search}/>
                <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
            </div>
        </div>
    )
};
export default SearchBox;

SearchBox.defaultProps = {
    styleName: "",
    value: "",
};
