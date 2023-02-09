import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { Outlet } from "react-router-dom";
import Selectors from "../pages/Selectors";


export default function Navigation () {
    return (
        <>
        <Stack>
            <Box sx={{mx:2}}> 
            <Selectors />
            </Box>
            <Box sx={{mx:2}}> 
            <Outlet />
            </Box>
        </Stack>
        </>
    )
}
 