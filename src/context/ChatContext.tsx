import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
    isChatDocked: boolean;
    setIsChatDocked: (docked: boolean) => void;
    isChatOpen: boolean;
    setIsChatOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [isChatDocked, setIsChatDocked] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <ChatContext.Provider value={{ isChatDocked, setIsChatDocked, isChatOpen, setIsChatOpen }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
