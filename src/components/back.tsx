import { useNavigate } from "react-router-dom";
import Icon from "../assets/icons";

const Back = () => {
  const navigate = useNavigate();
  return (
        <span
          className=' cursor-pointer items-center gap-2'
          onClick={() => navigate(-1)}>
          <Icon name="arrowLeft" />
        </span>
     
  );
};

export default Back;
