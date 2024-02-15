import Button from "../../../components/button";
import Logo from "../../../assets/Logo Desktop.svg";
import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col mt-20 w-[40%] mx-auto ">
      <img src={Logo} alt="logo" className="h-[27px]" />
      <p className="font-semibold text-md md:text-[26px] text-center mt-3">
      Password Changed
      </p>
      <span className="text-[14px] font-light text-center">
      Your password reset was successful
      </span>

      <div className="flex justify-center items-center mt-10">
        <Button size="md" variant="primary" type="submit" onClick={handleNext}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Success;
