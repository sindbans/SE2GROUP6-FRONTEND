// src/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // `user` is the currently logged-in user, or null if no one is logged in
  const [user, setUser] = useState(null);

  // `registeredUsers` is an object storing user details keyed by email.
  // For example: { 'abc@example.com': { firstName: 'Alice', ... } }
  const [registeredUsers, setRegisteredUsers] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser, registeredUsers, setRegisteredUsers }}>
      {children}
    </UserContext.Provider>
  );
};
