import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { db } from '../../lib/firebaseConfig';
import { useAuth } from '../../lib/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

interface ChatViewProps {
  auctionId: string;
}

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp;
}

export function ChatView({ auctionId }: ChatViewProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- 1. ESCUCHAR MENSAJES EN TIEMPO REAL ---
  useEffect(() => {
    if (!auctionId) return;

    // Referencia a: subastas/{id}/messages
    const messagesRef = collection(db, 'subastas', auctionId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
      // Scroll automático al último mensaje
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [auctionId]);

  // --- 2. ENVIAR MENSAJE ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const messagesRef = collection(db, 'subastas', auctionId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: user.id,
        senderName: user.name,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20">
        <h3 className="text-white font-semibold flex items-center gap-2">
          Chat de la Subasta
          <span className="text-xs font-normal text-white/50">(ID: {auctionId.slice(0, 6)}...)</span>
        </h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-white/40 mt-10">Inicia la conversación...</p>
        )}
        
        {messages.map((msg) => {
          const isMe = msg.senderId === user?.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                isMe 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-zinc-800 text-white rounded-tl-none'
              }`}>
                {!isMe && (
                  <p className="text-xs text-white/50 mb-1">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.text}</p>
                <p className="text-[10px] text-white/40 text-right mt-1">
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="bg-black/50 border-white/10 text-white"
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}