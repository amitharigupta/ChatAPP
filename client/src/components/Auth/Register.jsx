import { VStack } from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";

const Register = () => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [pic, setPic] = useState("");

    const postDetails = (pics) => {

    }

    const registerHandler = () => {

    }

  return (
    <VStack spacing={"5px"} color={"black"}>
        <FormControl id="first-name" isRequired>
            <FormLabel>
                First Name
            </FormLabel>
            <Input placeholder="Enter your first name" onChange={ (e) => setFirstname(e.target.value) } />
        </FormControl>
        <FormControl id="last-name" isRequired>
            <FormLabel>
                Last Name
            </FormLabel>
            <Input placeholder="Enter your last name" onChange={ (e) => setLastname(e.target.value) } />
        </FormControl>
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
        <FormControl id="confirm-password" isRequired>
            <FormLabel>
                Confirm Password
            </FormLabel>
            <Input type={"password"} placeholder="Enter your confirm password" onChange={ (e) => setConfirmPassword(e.target.value) } />
        </FormControl>
        <FormControl id="contact-no" isRequired>
            <FormLabel>
               Contact No
            </FormLabel>
            <Input placeholder="Enter your contact number" onChange={ (e) => setContactNo(e.target.value) } />
        </FormControl>
        <FormControl id="pic">
            <FormLabel>Upload your picture</FormLabel>
            <Input type="file" p={"1.5"} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl>
        <Button colorScheme={"blue"} width="100%" style={{ marginTop: 15 }} onClick={registerHandler} >
            Register
        </Button>
    </VStack>
  )
}

export default Register