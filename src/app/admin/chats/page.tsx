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

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const pass = window.prompt("Ingrese la contraseña");

    if (pass === "efaat2025") {
      setAuthorized(true);
    } else {
      window.location.replace("/");
    }

    setChecking(false);
  }, []);

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
    if (!authorized) return;

    loadMessages();

    const interval = setInterval(loadMessages, 3000);

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
      supabase.removeChannel(channel);
    };
  }, [authorized, loadMessages]);

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

  if (checking) {
    return <div>Cargando...</div>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="crm-container">
      <div className={mobileChatOpen ? "hide-mobile" : ""}>
        <button
          onClick={() => {
            const telefono = window.prompt(
              "Ingrese el número\nEj: 573001234567"
            );

            if (!telefono) return;

            setSelected(telefono);
            setMobileChatOpen(true);
          }}
        >
          + Nuevo Chat
        </button>

        <ChatList
          chats={chats}
          messages={messages}
          selected={selected}
          onSelect={(telefono: string) => {
            setSelected(telefono);
            setMobileChatOpen(true);
          }}
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
    </div>
  );
}