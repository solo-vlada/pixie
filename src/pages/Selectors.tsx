import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Selector from "../components/Selector";

const brands = ["NAP", "MRP", "ARM"];
const scales = ["clothing", "dresses", "belts"];
const schemes = [
  { central: "uk" },
  { central: "us" },
  { public: "it" },
  { public: "fr" },
];

export default function Selectors() {
  const { brand, scale, scheme } = useParams();

  return (
    <>
      <Grid container justifyContent={"center"} sx={{ m: 4 }}>
        <Grid item sx={{ mx: 2 }}>
          <Selector
            data={brands}
            label="Brands"
            urlParam={`brand/`}
            param={brand}
          />
        </Grid>
        <Grid item sx={{ mx: 2 }}>
          <Selector
            data={scales}
            label="Scales"
            urlParam={`brand/${brand}/scale/`}
            param={scale}
          />
        </Grid>
        <Grid item sx={{ mx: 2 }}>
          <Selector
            data={schemes}
            label="Schemes"
            urlParam={`brand/${brand}/scale/${scale}/scheme/`}
            param={scheme}
          />
        </Grid>
      </Grid>
    </>
  );
}
