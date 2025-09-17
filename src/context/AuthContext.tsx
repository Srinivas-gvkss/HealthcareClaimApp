import React, { createContext, useState } from 'react';

type AuthContextType = {
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  const signIn = async (email: string, password: string) => {
    // MOCK: replace with real API call
    setUser({
      id: 'u1',
      firstName: 'Demo',
      lastName: 'User',
      email,
      roles: ['individual'],
      currentRole: 'individual',
    });
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};