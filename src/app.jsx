import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const data = () => {
        axios
            .post("http://localhost:3006/auth/signup", {
                email: email,
                password: password,
            })
            .then((res) => {
                window.localStorage.setItem("refresh_token", res.data.refresh_token)
                window.localStorage.setItem("access_token", res.data.access_token)
                navigate("/logout");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <Box
            w="100%"
            h="100vh"
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="50px"
        >
            <Box
                w="500px"
                h="500px"
                bg="rgb(41, 41, 41)"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap="50px"
            >
                <Input
                    placeholder="email"
                    type="email"
                    color="black"
                    onChange={(e) => setEmail(e.target.value)}
                    w="90%"
                    bg="gray.100"
                    h="50px"
                    border="1px solid gray"
                />
                <Input
                    placeholder="password"
                    type="password"
                    color="black"
                    onChange={(e) => setPassword(e.target.value)}
                    w="90%"
                    bg="gray.100"
                    h="50px"
                    border="1px solid gray"
                />
                <Button onClick={() => data()}>signup</Button>
            </Box>
        </Box>
    );
}
