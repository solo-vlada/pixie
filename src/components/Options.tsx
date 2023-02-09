import MenuItem from "@mui/material/MenuItem"

type DataProps = {
    data: string[] | SchemeType[]
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


export default function Options () {
    return (
        <>
        </>
    )
}
