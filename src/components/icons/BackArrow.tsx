import React from "react";

const BackArrow = ({ size }: { size?: number }) => {
  return (
    <div>
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 27 23"
      >
        <path
          fill="#fff"
          d="M.94 10.592a1.5 1.5 0 0 0 0 2.121l9.545 9.546a1.5 1.5 0 1 0 2.122-2.121L4.12 11.652l8.486-8.485a1.5 1.5 0 1 0-2.122-2.121zM27 11.652v-1.5H2v3h25z"
        ></path>
      </svg>
    </div>
  );
};

export default BackArrow;
