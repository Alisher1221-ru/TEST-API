import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    async function logout(token) {
        await axios.post("http://localhost:3006/admins/logout", {"token": token})
        .then(res => setresult(res))
        .catch(err => console.log(err.message))
        window.localStorage.clear()
    }
    
    const apiPost = async () => {
        await axios.post("http://localhost:3006/admins/login", {"email": email, "password": password})
        .then(res => setresult(res))
        .catch(err => console.log(err.message))
    }
    
    const [result, setresult] = useState("")
    
    if (result.data) {
        window.localStorage.setItem("token", result.data.token);
        console.log(result.data.token);
    }
    const token = window.localStorage.getItem("token");
    useEffect(() => {
        axios.post("http://localhost:3006/admins/refresh", {"token": token})
        .then(res => setresult(res))
        .catch(error => console.log(error.message))
    }, [token])
    return(
        <>
        {
            !result.data?
            <Box w='100%' h='100vh' bg='black' display='flex' alignItems='center' justifyContent='center' gap='50px'>
                <Box w='500px' h='500px' borderRadius='10px' overflow='hidden'>
                    <Image src="https://www.shutterstock.com/image-vector/admin-icon-strategy-collection-thin-600nw-2307398667.jpg" objectFit='cover' alt="error is img " w='100%' h='100%' />
                </Box>
                <Box w='500px' h='500px' bg='rgb(41, 41, 41)' borderRadius='10px' display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap='50px'>
                    <Input placeholder="email" type="email" color='black' onChange={(e) => setemail(e.target.value)} w='90%' bg='gray.100' h='50px' border='1px solid gray' />
                    <Input placeholder="password" type="password" color='black' onChange={(e) => setpassword(e.target.value)} w='90%' bg='gray.100' h='50px' border='1px solid gray' />
                    <Button onClick={() => apiPost()} >GO</Button>
                </Box>
            </Box>
             : 
            <Box w='100%' h='100vh' bg='black' display='flex' alignItems='center' justifyContent='center' gap='50px'>
                <Box w='500px' h='500px' bg='rgb(41, 41, 41)' borderRadius='10px' display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap='50px'>
                    <Text color='white'>{result.data.email}</Text>
                    <Button bg='gray' onClick={() => logout(token)}>logout</Button>
                </Box>
            </Box>
        }
        </>
    )
}
