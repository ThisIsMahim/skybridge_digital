import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

const ChatModal = () => {
    const { setIsChatOpen } = useChatContext();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 w-[350px] h-[500px] bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ transformOrigin: "bottom right" }}
        >
            {/* Header */}
            <div className="p-4 border-b border-border bg-accent/5 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-lg">Skybridge AI</h3>
                    <p className="text-xs text-muted-foreground">Assistant • Online</p>
                </div>
                <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 hover:bg-black/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-background/50">
                <div className="flex flex-col space-y-4">
                    <div className="bg-accent/10 self-start max-w-[80%] rounded-2xl rounded-tl-none p-3 text-sm">
                        Hello! How can I help you with your digital transformation today?
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-secondary/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    />
                    <button className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full transition-colors">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatModal;
