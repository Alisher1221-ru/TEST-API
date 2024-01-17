import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Logout() {
    const refresh_token = window.localStorage.getItem("refresh_token")
    useEffect(() => {
      axios.post("http://localhost:3006/auth/refresh", {
        
      })
    },[])
    return(
        <Box>
          <Button>logout</Button>
        </Box>
    )
}
