import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/api";
import { socket } from "@/services/io";
import { handleLogout } from "@/utils/handleLogout";
import { AxiosResponse } from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { Header } from "../Header";
import Link from "next/link";
import { Message } from "../Message";
import { TextArea } from "../TextArea";

interface ChatIdParams {
  chatId: string
};

interface User {
  name: string,
  username: string
};
interface Message {
  id: string,
  user: User,
  content: string,
  time: string
};


export const ChatArea: React.FC<ChatIdParams> = ({ chatId }) => {
  const [chatUser, setChatUser] = useState<User | null>();
  const [messageList, setMessageList] = useState<Message[]>();
  const [message, setMessage] = useState<string>();

  const context = useContext(AuthContext);
  const messageArea = useRef<HTMLDivElement | null>(null);

  const getMessages = async () => {
    try {
      const response = await api.get(`/message/list/${chatId}`, { headers: { 'authorization': 'Bearer ' + context.token } });
      setMessageList(response.data.messages)
    }
    catch (err) {
      console.log(err)

      if (typeof err == "object" && err != null && "response" in err) {
        const errorResponse = err.response as unknown as AxiosResponse;

        if (errorResponse.data.message == "Invalid token") handleLogout();

      };
    }
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    socket.emit("message", { room: chatId, user: context.user, message, to: chatUser?.username });
    setMessage('');
  };

  useEffect(() => {
    if (context.token) getMessages();

    socket.emit("join chat", chatId);
    socket.on("message", (msg: Message) => {
      setMessageList(prev => [...(prev || []), msg])
    });

    const queryParams = new URLSearchParams(window.location.search);
    setChatUser({
      name: queryParams.get("name")!,
      username: queryParams.get("username")!
    });
    return () => {
      socket.off("message")
    };
  }, [context]);

  useEffect(() => {
    if (messageArea.current) messageArea.current.scrollTop = messageArea.current.scrollHeight;

  }, [messageList]);

  return (
    <Container>
      <header className="topSide">
        <Link href="/dashboard">
          <img src="/arrowRight.svg" alt="Retornar" />
          Voltar à página inicial
        </Link>

        <span>
          Chat com: {chatUser?.name}
        </span>
      </header>

      <div className="messageArea" ref={messageArea}>
        {
          messageList?.map(msg => {
            return (
              <Message
                key={msg.id}
                content={msg.content}
                name={msg.user.name}
                time={msg.time}
              />
            )
          })
        }
      </div>

      <form className="inputArea" onSubmit={(e) => sendMessage(e)}>
        <TextArea
          placeholder="Digite sua mensagem"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button className="sendButton" type="submit">
          <img src="/sendIcon.svg" alt="Enviar" />
        </button>
      </form>
    </Container>
  );

};