import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/Home/SearchBar.css";
import Icon from "../../assets/images/common/SearchIcon.png";

function SearchBar({ query, setQuery }) {
  const onChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  }

  const submit = (e) => {
    e.preventDefault();
    // 검색 시 navigate는 제거 (동일 페이지 내 검색이므로)
  }

  return (
    <form className="search-container" onSubmit={submit}>
      <img className="search-icon" src={Icon} alt="search icon" />
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={onChange}
        placeholder="챌린지를 검색하세요"
      />
    </form>
  );
}

export default SearchBar; 