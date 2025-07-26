import MarkedLabel from "../MarkedLabel";

const StoryStatus = ({ status, activeStatus }) => {
  return status === activeStatus ? <MarkedLabel /> : null;
};

export default StoryStatus; 