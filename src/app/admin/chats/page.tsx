"use client";

import "./page.css";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import ChatList from "@/components/chats/ChatList";
import ChatWindow from "@/components/chats/ChatWindow";
import MessageInput from "@/components/chats/MessageInput";

export default function ChatsPage() {

  const [messages, setMessages] =
    useState<any[]>([]);

  const [selected, setSelected] =
    useState("");

  async function loadMessages() {

    const { data } =
      await supabase
        .from("messages")
        .select("*")
        .order("created_at", {
          ascending: true
        });

    setMessages(data || []);

  }

  useEffect(() => {
    loadMessages();
  }, []);

  const chats = useMemo(() => {

    return [
      ...new Set(
        messages.map(
          (m) => m.telefono
        )
      )
    ];

  }, [messages]);

  useEffect(() => {

    if (
      chats.length &&
      !selected
    ) {
      setSelected(
        chats[0]
      );
    }

  }, [chats, selected]);

  const currentMessages =
    messages.filter(
      (m) =>
        m.telefono === selected
    );

  return (

    <div className="crm-container">

      <ChatList
        chats={chats}
        messages={messages}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="chat-area">

        <ChatWindow
          messages={currentMessages}
          selected={selected}
        />

        <MessageInput

          onSend={async (
            texto,
            archivo
          ) => {

            try {

              if (archivo) {

                const formData =
                  new FormData();

                formData.append(
                  "file",
                  archivo
                );

                formData.append(
                  "telefono",
                  selected
                );

                formData.append(
                  "mensaje",
                  texto || ""
                );

                const response =
                  await fetch(
                    "https://efaat.com/meta/send-media",
                    {
                      method: "POST",
                      body: formData
                    }
                  );

                const result =
                  await response.json();

                console.log(result);

              }

              else {

                const response =
                  await fetch(
                    "https://efaat.com/meta/send-message",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json"
                      },
                      body: JSON.stringify({
                        telefono: selected,
                        mensaje: texto
                      })
                    }
                  );

                await response.json();

              }

              await loadMessages();

            }

            catch (err) {

              console.log(err);

            }

          }}

        />

      </div>

    </div>

  );

}