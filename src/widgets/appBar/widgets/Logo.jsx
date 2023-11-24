import { Images } from "@/constants";

function Logo({ width }) {
  return (
    <picture>
      <img src={Images.Logo} alt="" style={{ width: `${width}px` }} />
    </picture>
  );
}

Logo.displayName = "/src/widgets/atoms/Logo.jsx";

export default Logo;
