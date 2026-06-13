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

    const [mobileChatOpen,
  setMobileChatOpen] =
  useState(false);

  async function loadMessages() {

    const { data } =
      await supabase
        .from("messages")
        .select("*")
        .order(
          "created_at",
          {
            ascending: true
          }
        );

    setMessages(data || []);

  }

  useEffect(() => {
    loadMessages();
  }, []);

  const chats = useMemo(() => {

    const telefonos = [
      ...new Set(
        messages.map(
          (m) => m.telefono
        )
      )
    ];

    return telefonos.sort(
      (a, b) => {

        const ultimoA =
          messages
            .filter(
              m => m.telefono === a
            )
            .at(-1);

        const ultimoB =
          messages
            .filter(
              m => m.telefono === b
            )
            .at(-1);

        return (
          new Date(
            ultimoB?.created_at || 0
          ).getTime()
          -
          new Date(
            ultimoA?.created_at || 0
          ).getTime()
        );

      }
    );

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
      m =>
        m.telefono === selected
    );

  return (

    <div className="crm-container">

      <div
  className={
    mobileChatOpen
      ? "hide-mobile"
      : ""
  }
>

  <ChatList
    chats={chats}
    messages={messages}
    selected={selected}
    onSelect={(telefono) => {

      setSelected(
        telefono
      );

      setMobileChatOpen(
        true
      );

    }}
  />

</div>
      <div
  className={`chat-area ${
    mobileChatOpen
      ? "show-mobile"
      : ""
  }`}
>
        <ChatWindow
  messages={currentMessages}
  selected={selected}
  onBack={() =>
    setMobileChatOpen(
      false
    )
  }
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

                await fetch(
                  "https://efaat.com/meta/send-media",
                  {
                    method: "POST",
                    body: formData
                  }
                );

              }

              else {

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

              }

              await loadMessages();

            }

            catch (err) {

              console.error(err);

            }

          }}

        />

      </div>

    </div>

  );

}