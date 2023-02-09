import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Information() {
  const { brand, scale, scheme } = useParams();

  return (
    <>
      <Typography>Brand: {brand}</Typography>
      <Typography>Scale: {scale}</Typography>
      <Typography>Scheme: {scheme} </Typography>
    </>
  );
}
