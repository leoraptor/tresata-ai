import React from "react";

const SearchIcon = ({ size }: { size?: number }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 22 22"
      >
        <path
          fill="#034EA2"
          d="m17 16.372-3.352-3.352a4.89 4.89 0 1 0-.628.628L16.372 17zM5.903 9.898a3.995 3.995 0 1 1 7.99 0 3.995 3.995 0 0 1-7.99 0"
        ></path>
      </svg>
    </div>
  );
};

export default SearchIcon;
