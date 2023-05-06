import axios from "axios";
import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../../src/utils/URL";

const Chat = () => {
  const [chatData, setChatData] = useState([]);

  const fetchChats = async () => {
    const {data} = await axios.get(API_BACKEND_URL + "/chat/all");
    console.log(data);
    setChatData(data.data);
  }

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {
        chatData && chatData.map((chat) => {
          return (<div key={chat._id}>{chat.chatName}</div>)
        })
      }
    </div>
  )
}

export default Chat