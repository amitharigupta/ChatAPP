import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Home = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={"3"}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text textColor={"black"} fontSize={"2xl"} fontFamily={"poppins"}>
          Welcome to CHAT APP
        </Text>
      </Box>
      <Box bg={"white"} w="100%" borderRadius={"lg"} borderWidth={"1px"} color="black">
        <Tabs variant="soft-rounded" margin={"4px 0 0 10px"}>
          <TabList mb="1em">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
