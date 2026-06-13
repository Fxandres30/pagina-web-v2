"use client";

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

    <div
      style={{
        height: "100vh",
        display: "flex",
        background: "#f0f2f5"
      }}
    >

      <ChatList
        chats={chats}
        messages={messages}
        selected={selected}
        onSelect={setSelected}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >

        <ChatWindow
          messages={currentMessages}
          selected={selected}
        />

        <MessageInput
  onSend={async (texto) => {

    try {

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

              telefono:
                selected,

              mensaje:
                texto

            })

          }

        );

      const result =
        await response.json();

      console.log(
        "ENVIADO:",
        result
      );

      await loadMessages();

    }

    catch (err) {

      console.log(
        "ERROR:",
        err
      );

    }

  }}
/>

      </div>

    </div>

  );

}