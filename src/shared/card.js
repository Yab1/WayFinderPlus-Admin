// MUI Components
import Card from "@mui/material/Card";

export default function StyledCard({ children, start }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        // height: {sm:'90%'},
        positon: "relative",
        zIndex: 15,
        my: 5.5,
        mx: "1%",
        display: "flex",
        flexDirection: "column",
        justifyContent: !start ? "center" : "flex-start",
        alignItems: "center",
      }}
    >
      {children}
    </Card>
  );
}
