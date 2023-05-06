import { VStack } from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { API_BACKEND_URL } from "../../utils/URL";
import axios from "axios";

const Login = () => {

    const toast = useToast();
  const history = useHistory();

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandler = async () => {
        setLoading(true);
        if(!email || !password) {
            toast({
                title: "Please Fill All The Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            let configOptions = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post(API_BACKEND_URL + `/user/login`, {
                email, password 
            }, configOptions);
    
            console.log(data);
            toast({
                title: "Login Successfull",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            setLoading(false);
            history.push("/chats")
        } catch (error) {
            toast({
                title: "Please Fill All The Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    }
  return (
    <VStack spacing={"5px"} color={"black"}>
        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input type={"email"} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup size={"md"}>
            <Input type={ show ? "text": "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value) } />
            <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorScheme={"blue"} width="100%" style={{ marginTop: 15 }} onClick={loginHandler} >
            Login
        </Button>
        <Button variant={"solid"} colorScheme={"red"} width="100%" color={"white"} onClick={() => { setEmail("guest@gmail.com"); setPassword("123456") } } >
            Get Guest User Credentails
        </Button>
    </VStack>
  )
}

export default Login