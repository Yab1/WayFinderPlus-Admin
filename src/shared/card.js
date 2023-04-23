// MUI Components
import Card from "@mui/material/Card";

export default function StyledCard({ children }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "91%",
        my: 5.5,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Card>
  );
}
