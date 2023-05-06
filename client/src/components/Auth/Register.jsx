import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_BACKEND_URL } from "../../utils/URL";

const Register = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dg97u7grf");
      let response = await axios.post(
        `https://api.cloudinary.com/v1_1/dg97u7grf/image/upload`,
        data
      );

      if (response) {
        console.log(response);
        setPic(response.data.url);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const registerHandler = async () => {
    setLoading(true);
    if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNo) {
        toast({
            title: "Please Fill all the fields",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        })
        setLoading(false);
        return;
    }
    if(password !== confirmPassword) {
        toast({
            title: "Password Do Not Match",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        })
        setLoading(false);
        return;
    }

    try {
        let configOptions = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(API_BACKEND_URL + `/user/register`, {
            firstName, lastName, email, password, pic, 
        }, configOptions);

        console.log(data);
        toast({
            title: data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setLoading(false);
        history.push("/chats")
    } catch (error) {
        console.log(error);
        toast({
            title: error,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="Enter your first name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </FormControl>
      <FormControl id="last-name" isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Enter your last name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size={"md"}>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size={"md"}>
        <Input
          type={"password"}
          placeholder="Enter your confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="contact-no" isRequired>
        <FormLabel>Contact No</FormLabel>
        <Input
          placeholder="Enter your contact number"
          onChange={(e) => setContactNo(e.target.value)}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={"1.5"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={registerHandler}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
