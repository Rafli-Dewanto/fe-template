import React from "react";

export const AppContext = React.createContext<{
  foo: string;
  setFoo: (foo: string) => void;
} | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [foo, setFoo] = React.useState('');

  return (
    <AppContext.Provider value={{ foo, setFoo }}>
      {children}
    </AppContext.Provider>
  );
};
