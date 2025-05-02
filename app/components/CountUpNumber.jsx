import React, { useState, useEffect } from "react";

// تبسيط المكون لعرض الرقم النهائي فقط
const CountUpNumber = ({ end, duration = 2000, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.min(Math.floor(progress * end), end);
        setCount(currentCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    } else {
      setCount(0);
    }
  }, [end, duration, isInView]);

  return <span className="stat-value">{count.toLocaleString()}</span>;
};

export default CountUpNumber;
