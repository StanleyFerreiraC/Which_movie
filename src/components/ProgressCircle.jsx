import "./style/ProgressCircle.css";



const ProgressCircle = ({percent}) => {
  const dashArray = Math.PI * 100;
  const dashOffset = Math.PI * (100 - percent);

  const bar = {
    low: "#db2360",
    medium: "#d2d531",
    high: "#21d07a",
    none:"#d4d4d4"
  };

  const track = {
    low: "#571435",
    medium: "#423d0f",
    high: "#204529",
    none:"#666666"
  };

  const getColor = (rating)=>{
    if(rating >= 70) return "high";
    if(rating >= 40) return "medium";
    if(rating > 0) return "low";
    return "none"
  }

  return (
    <div className="circle-full">
      <svg className="svg-circle" viewBox="0 0 100 100">
        <circle
          cx="53"
          cy="52"
          r="50"
          fill="transparent"
          stroke={track[getColor(percent)]}
          strokeWidth={6}
          strokeDasharray={dashArray}
          className="circle"
        />

        <circle
          cx="53"
          cy="52"
          r="50"
          fill="transparent"
          stroke={bar[getColor(percent)]}
          strokeWidth={6}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          className="circle"
          strokeLinecap="round"
        />
      </svg>

      <div className="cicle-percent">
        
        {percent? <div>{percent.toFixed(0)}</div> : "NR"}
        
      </div>
    </div>
  );
};

export default ProgressCircle;
