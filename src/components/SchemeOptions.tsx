import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";

type DataProps = {
  data: string[] | SchemeType[];
  label?: string;
};

type SchemeType =
  | {
      central: string;
      public?: undefined;
    }
  | {
      public: string;
      central?: undefined;
    };

export default function SchemeOptions() { 
  return (
    <>

    </>
  );
}


