import { Images } from "@/constants";

function Logo() {
  return (
    <picture>
      <img src={Images.Logo} alt="" style={{ width: "200px" }} />
    </picture>
  );
}

Logo.displayName = "/src/widgets/atoms/Logo.jsx";

export default Logo;
