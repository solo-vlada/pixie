//MUI components
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";

//React
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//Types
type DataProps = {
  data: string[] | SchemeType[];
  label?: string;
  urlParam: string;
  param?: string | undefined;
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

//component to add central or public param into the url
const UpdateParam = (option: SchemeType) => {
  const [param, setParam] = useState("");
  useEffect(() => setParam(Object.keys(option)[0]), [option]);
  return { param };
};

// custom hook to render correct options in the selectors
//TODO: fix the Link - add it as a component to MenuItem to fix the width of clickable area
// Currently the Link work only if clicked on text 
const useOptions = (
  label: string | undefined,
  data: string[] | SchemeType[],
  urlParam: string
) => {
  if (label !== "Schemes") {
    const options = (data as string[]).map((option: string, key: number) => {
      return (
        <MenuItem key={option} value={option}>
          <Link to={`${urlParam}${option}`}>{option}</Link>
        </MenuItem>
      );
    });
    return [...options];
  } else {
    const options = (data as SchemeType[]).map(
      (option: SchemeType, key: number) => {
        //toggles between public or central param in the url
        const { param } = UpdateParam(option);

        return (
          <MenuItem
            key={key + Object.keys(option)[0]}
            value={Object.values(option)[0]}
          >
            <Link to={`${urlParam}${param}/${Object.values(option)}`}>
              {Object.values(option)}
            </Link>
          </MenuItem>
        );
      }
    );

    //checks if options are public or cental by unique key
    //adds Central or Public subheader accordingly
    //TODO - create a separate function for this to avoid repetative code?
    const centralOptions = options.filter(
      (option: JSX.Element, key: number) => option.key === key + "central"
    );
    const publicOptions = options.filter(
      (option: JSX.Element, key: number) => option.key === key + "public"
    );
    return [
      <ListSubheader>Central Schemes</ListSubheader>,
      ...centralOptions,
      <ListSubheader>Public Schemes</ListSubheader>,
      ...publicOptions,
    ];
  }
};

export default function Selector({ data, label, urlParam, param }: DataProps) {
  const [value, setValue] = useState<string | undefined>("");

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  //updates selector on url param change
  useEffect(() => {
    setValue(param);
  }, [param]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId={label}
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {useOptions(label, data as string[], urlParam)}
        </Select>
      </FormControl>
    </Box>
  );
}
