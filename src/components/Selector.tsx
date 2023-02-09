import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

// custom hook to render correct option to the selectors
const useOptions = (
  label: string | undefined,
  data: string[] | SchemeType[],
  urlParam: string,
) => {
  if (label !== "Schemes") {
    const options = (data as string[]).map((option: string, key: number) => {
      return (
        <MenuItem key={key} value={option}>
          <Link to={`${urlParam}${option}`}>{option}</Link>
        </MenuItem>
      );
    });
    return [...options];
  } else {
    const options = (data as SchemeType[]).map(
      (option: SchemeType, key: number) => {

        //toggle between public or central param
        const { param } = UpdateParam(option);

        return (
         <MenuItem key={key} value={Object.values(option)[0]}>
            <Link
              to={`${urlParam}${param}/${Object.values(option)}`}
            >
              {Object.values(option)}
            </Link>
          </MenuItem>
        );
      }
    );
    return [<ListSubheader>Central Schemes</ListSubheader>, ...options];
  }
};

export default function Selector({ data, label, urlParam, param}: DataProps) {
  const [value, setValue] = useState<string | undefined>("");

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  
  //update selector on url param change
  React.useEffect(() => {
    setValue(param);
  }, [param]);

  // const renderCentralOptions = (data: SchemeType[]) => {
  //   const centralOptions = data.map((option: SchemeType, key: number) => {
  //     if (Object.hasOwn(option, "central")) {
  //       return (
  //         <MenuItem key={key} value={option.central}>
  //           <Link to={`${urlParam}central/${option.central}`}>
  //             {option.central}
  //           </Link>
  //         </MenuItem>
  //       );
  //     }
  //   });
  //   return [<ListSubheader>Central Scheme</ListSubheader>, ...centralOptions];
  // };

  // const renderPublicOptions = (data: SchemeType[]) => {
  //   const publicOptions = data?.map((option: SchemeType, key: number) => {
  //     if (Object.hasOwn(option, "public")) {
  //       return (
  //         <MenuItem key={key} value={option.public}>
  //           <Link to={`${urlParam}public/${option.public}`}>
  //             {option.public}
  //           </Link>
  //         </MenuItem>
  //       );
  //     }
  //   });
  //   return [<ListSubheader>Public Scheme</ListSubheader>, ...publicOptions];
  // };

  // const useOptions = (data: string[]) => {
  //   const options = data.map((option: string, key: number) => {
  //     return (
  //       <MenuItem key={key} value={option}>
  //         <Link to={`${urlParam}${option}`}>{option}</Link>
  //       </MenuItem>
  //     );
  //   });
  //   return [...options];
  // };

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
          {/* {label === "Schemes" && renderCentralOptions(data as SchemeType[])}
          {label === "Schemes" && renderPublicOptions(data as SchemeType[])}
          {label !== "Schemes" && renderOptions(data as string[], urlParam as string)} */}
          {useOptions(label, data as string[], urlParam)}
        </Select>
      </FormControl>
    </Box>
  );
}
