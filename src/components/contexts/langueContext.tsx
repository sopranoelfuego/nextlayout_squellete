"use client";
import React, { useState } from "react";

export const LangueContext = React.createContext<{
  langue: string;
  changeLangue: Function;
}>({ langue: "en", changeLangue: (lng:string) => null });

type LangaueType = "eng" | "fr" | 'bi';
export function LanguageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [expand, setExpand] = useState(true)
  const [langue, setLangue] = useState<LangaueType>("eng");
  const changeLangue = (lng: LangaueType) => {
    switch (lng) {
      case "fr":
        setLangue("fr");

        break;

      default:
        setLangue("eng");
        break;
    }
  };
  return (
    <LangueContext.Provider value={{ langue, changeLangue }}>
      {children}
    </LangueContext.Provider>
  );
}
