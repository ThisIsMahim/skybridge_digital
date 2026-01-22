import { MessageCircle } from "lucide-react";

const FloatingChatButton = () => {
  return (
    <button
      onClick={() => {
        console.log("Chat button clicked - integrate your AI chatbot here");
      }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-none flex items-center justify-center transition-all duration-300 hover:scale-110 group bg-foreground text-background hover:bg-accent"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
    </button>
  );
};

export default FloatingChatButton;