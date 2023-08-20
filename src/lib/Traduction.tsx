"use client";
import { LangueContext } from "@/components/contexts/langueContext";
import React, { useContext, useEffect, useState } from "react";

// third-party
import { IntlProvider } from "react-intl";

const LoadTraductions = (locale: string) => {
  switch (locale) {
    case "fr":
      return import("./frenc.json");
    case "bi":
      return import("./kir.json");

    default:
      return import("./engl.json");
  }
};

// ==============================|| LOCALIZATION ||============================== //

const TraductionProvider = ({ children }: { children: React.ReactNode }) => {
  const { langue } = useContext(LangueContext);

  const [messages, setMessages] = useState<any>("");

  useEffect(() => {
    if (langue) {
      LoadTraductions(langue).then((d) => {
        setMessages(d?.default);
      });
    }
  }, [langue]);

  return (
    <IntlProvider
      locale={langue === "eng" ? "en" : "fr"}
      defaultLocale="fr"
      messages={messages}
    >
      {/* @ts-ignore */}
      {children}
    </IntlProvider>
  );
};

export default TraductionProvider;
