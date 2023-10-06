import { Fragment } from "react";
import { Map } from "@/widgets/layout";
import { InfoCard } from "@/widgets/cards";

function MyMap() {
  return (
    <Fragment>
      <InfoCard />
      <Map />
    </Fragment>
  );
}

MyMap.displayName = "/src/pages/MyMap.jsx";

export default MyMap;
