import { VStack } from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {

    }
  return (
    <VStack spacing={"5px"} color={"black"}>
        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input type={"email"} placeholder="Enter your email" onChange={ (e) => setEmail(e.target.value) } />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup size={"md"}>
            <Input type={ show ? "text": "password"} placeholder="Enter your password" onChange={ (e) => setPassword(e.target.value) } />
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
    </VStack>
  )
}

export default Login