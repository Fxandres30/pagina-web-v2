"use client";

import "./page.css";

import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

import ChatList from "@/components/chats/ChatList";
import ChatWindow from "@/components/chats/ChatWindow";
import MessageInput from "@/components/chats/MessageInput";

interface Message {
  id?: string;
  telefono: string;
  mensaje?: string;
  created_at: string;
  [key: string]: any;
}

export default function ChatsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const [showNewChat, setShowNewChat] = useState(false);
const [newPhone, setNewPhone] = useState("");

  const loadMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);
useEffect(() => {

  loadMessages();

  const interval = setInterval(
    loadMessages,
    3000
  );

  const channel = supabase
    .channel("messages-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      () => {
        loadMessages();
      }
    )
    .subscribe();

  return () => {

    clearInterval(interval);

    supabase.removeChannel(
      channel
    );

  };

}, [loadMessages]);
  const chats = useMemo(() => {
    const telefonos = [
      ...new Set(messages.map((m) => m.telefono)),
    ];

    return telefonos.sort((a, b) => {
      const ultimoA = messages
        .filter((m) => m.telefono === a)
        .at(-1);

      const ultimoB = messages
        .filter((m) => m.telefono === b)
        .at(-1);

      return (
        new Date(ultimoB?.created_at || 0).getTime() -
        new Date(ultimoA?.created_at || 0).getTime()
      );
    });
  }, [messages]);

  useEffect(() => {
    if (chats.length > 0 && !selected) {
      setSelected(chats[0]);
    }
  }, [chats, selected]);

  const currentMessages = messages.filter(
    (m) => m.telefono === selected
  );

  return (
    <div className="crm-container">
      {!mobileChatOpen && (
  <button
    className="floating-new-chat"
    onClick={() =>
      setShowNewChat(true)
    }
  >
    +
  </button>
)}
      <div className={mobileChatOpen ? "hide-mobile" : ""}>
      

       <ChatList
  chats={chats}
  messages={messages}
  selected={selected}
  onSelect={(telefono) => {
    setSelected(telefono);
    setMobileChatOpen(true);
  }}
  onNewChat={() =>
    setShowNewChat(true)
  }
/>
      </div>

      <div
        className={`chat-area ${
          mobileChatOpen ? "show-mobile" : ""
        }`}
      >
        <ChatWindow
          messages={currentMessages}
          selected={selected}
          onBack={() => setMobileChatOpen(false)}
        />

        <MessageInput
          onSend={async (texto, archivo) => {
            try {
              if (!selected) {
                alert("Seleccione un chat");
                return;
              }

              if (archivo) {
                const formData = new FormData();

                formData.append("file", archivo);
                formData.append("telefono", selected);
                formData.append(
                  "mensaje",
                  texto || ""
                );

                await fetch(
                  "https://efaat.com/meta/send-media",
                  {
                    method: "POST",
                    body: formData,
                  }
                );
              } else {
                await fetch(
                  "https://efaat.com/meta/send-message",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify({
                      telefono: selected,
                      mensaje: texto,
                    }),
                  }
                );
              }

              await loadMessages();
            } catch (err) {
              console.error(err);
              alert(
                "Error al enviar el mensaje"
              );
            }
          }}
        />
      </div>
      {showNewChat && (
  <div className="modal-overlay">
    <div className="new-chat-modal">

      <h2>Nueva conversación</h2>

      <p>Ingrese el número de WhatsApp</p>

      <input
        type="text"
        placeholder="573001234567"
        value={newPhone}
        onChange={(e) =>
          setNewPhone(e.target.value)
        }
      />

      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowNewChat(false);
            setNewPhone("");
          }}
        >
          Cancelar
        </button>

        <button
          className="create-btn"
          onClick={() => {
            if (!newPhone) return;

            setSelected(newPhone);
            setMobileChatOpen(true);

            setShowNewChat(false);
            setNewPhone("");
          }}
        >
          Crear Chat
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}