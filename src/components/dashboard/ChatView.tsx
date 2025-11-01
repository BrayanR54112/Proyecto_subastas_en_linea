import { useState } from 'react';
import { Send, User, Image as ImageIcon, Paperclip } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { mockMessages } from '../../lib/mockData';

export function ChatView() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'María González',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const otherUser = {
    name: 'Carlos Martínez',
    rating: 4.9,
    status: 'online'
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                {otherUser.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                )}
              </div>
              <div>
                <h4 className="text-white">{otherUser.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-white/60 text-sm">{otherUser.rating}</span>
                  <span className="text-white/40 text-sm">•</span>
                  <span className="text-green-500 text-sm">{otherUser.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Context */}
        <div className="p-4 bg-red-600/5 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-lg flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
                alt="Producto"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm mb-1">Chat sobre:</p>
              <h4 className="text-white/90 text-sm">Reloj Rolex Submariner Vintage 1965</h4>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Precio final</p>
              <p className="text-red-500">$12,500</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === '1';
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className="flex items-center gap-2">
                    {!isOwn && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <span className="text-white/60 text-xs">{message.senderName}</span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      isOwn
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <span className="text-white/40 text-xs">
                    {message.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/5">
          <div className="flex items-end gap-2">
            <button
              type="button"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-black/50 border-white/10 text-white"
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
