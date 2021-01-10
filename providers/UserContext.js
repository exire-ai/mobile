import React, { useState, createContext, useMemo } from 'react';

const UserContext = createContext();

const useUser = () => {
    const [name, setName] = useState('');

    return {
        name,
        setName
    };
};

const User = ({ children }) => {
    const { name, setName } = useUser();
    const userProvider = useMemo(() => ({ name, setName }), [name, setName]);

    return (
        <UserContext.Provider value={userProvider}>
            {children}
        </UserContext.Provider>
    );
};

export default User;
