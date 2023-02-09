import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function ErrorPage () {
    return (
        <>

        <Typography variant="h2">
            Oops - this page does not exist
        </Typography>
        <Link to="/v2">Go back to the homepage</Link>
        </>
    )
}

