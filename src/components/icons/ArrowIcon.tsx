import React from "react";

const ArrowIcon = ({ size }: { size?: number }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 12 6"
      >
        <path
          fill="#034EA2"
          d="M11.705 5.547a.8.8 0 0 0 .218-.269.7.7 0 0 0 0-.635.8.8 0 0 0-.219-.269L6.71.244a1 1 0 0 0-.325-.18 1.2 1.2 0 0 0-.768 0 1 1 0 0 0-.325.18L.296 4.374a.8.8 0 0 0-.22.27.7.7 0 0 0 0 .634q.079.152.22.27c.092.077.203.138.325.18a1.2 1.2 0 0 0 .768 0q.184-.064.325-.18l2.372-1.966a3 3 0 0 1 3.828 0l2.372 1.965q.14.118.325.181a1.18 1.18 0 0 0 .768 0c.122-.042.233-.103.325-.18"
        ></path>
      </svg>
    </div>
  );
};

export default ArrowIcon;
