import { useState } from 'react';
import { Upload, Image as ImageIcon, X, Link } from 'lucide-react'; 
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { categories } from '../../lib/mockData';
import { db } from '../../lib/firebaseConfig';
import { useAuth } from '../../lib/AuthContext';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function UploadProduct() {
  const { user } = useAuth();
  
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startingBid: '',
    duration: '10', // ¡Por defecto en 10 minutos para tu demo!
    condition: 'new'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Debes estar logueado para subir un producto.");
      return;
    }
    if (!imageUrl) {
      alert("Por favor, pega la URL de una imagen.");
      return;
    }

    setLoading(true);

    try {
      // --- CAMBIO EN EL CÁLCULO DE TIEMPO ---
      // Ahora 'formData.duration' viene en MINUTOS
      const durationMinutes = parseInt(formData.duration);
      const endTimeMs = Date.now() + durationMinutes * 60 * 1000; // Minutos * 60 segs * 1000 ms

      const newAuction = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        startingBid: parseFloat(formData.startingBid),
        condition: formData.condition,
        image: imageUrl,
        sellerId: user.id,
        sellerName: user.name,
        currentBid: parseFloat(formData.startingBid),
        bids: 0,
        status: 'active', 
        isLive: true,
        endTime: Timestamp.fromDate(new Date(endTimeMs)), // Usamos el nuevo cálculo
        createdAt: Timestamp.fromDate(new Date()),
      };

      await addDoc(collection(db, 'subastas'), newAuction);

      setLoading(false);
      alert('¡Artículo publicado exitosamente! Tu subasta comenzará pronto.');
      
      setFormData({
        title: '',
        description: '',
        category: '',
        startingBid: '',
        duration: '10', // Reseteamos a 10 min
        condition: 'new'
      });
      setImageUrl('');

    } catch (error) {
      console.error("Error al publicar subasta: ", error);
      setLoading(false);
      alert("Hubo un error al subir tu producto. Revisa la consola.");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h3 className="text-white mb-2">Subir Artículo</h3>
        <p className="text-white/60">Completa la información de tu producto para crear una subasta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Imagen del Producto</h4>
          
          <label className="text-white/80 text-sm mb-2 block">URL de la Imagen *</label>
          <p className="text-white/40 text-sm mb-3">
            (Busca una imagen en Google, haz clic derecho, "Copiar dirección de imagen" y pégala aquí)
          </p>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                <Link className="w-4 h-4" />
              </span>
              <Input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                disabled={loading}
                className="bg-black/50 border-white/10 text-white pl-10"
              />
            </div>
            <div className="w-32 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
              <ImageWithFallback
                src={imageUrl}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-6">
          <h4 className="text-white">Información Básica</h4>
          
          <div>
            <label className="text-white/80 text-sm mb-2 block">Título del Artículo *</label>
            <Input
              type="text"
              placeholder="Ej: Reloj Rolex Submariner Vintage 1965"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
              className="bg-black/50 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="text-white/80 text-sm mb-2 block">Descripción *</label>
            <Textarea
              placeholder="Describe tu artículo en detalle: condición, características, historia, etc."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              disabled={loading}
              rows={6}
              className="bg-black/50 border-white/10 text-white resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Categoría *</label>
              <Select 
                value={formData.category} 
                onValueChange={(value: string) => setFormData({ ...formData, category: value })}
                disabled={loading}
              >
                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Condición *</label>
              <Select 
                value={formData.condition} 
                onValueChange={(value: string) => setFormData({ ...formData, condition: value })}
                disabled={loading}
              >
                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="like-new">Como nuevo</SelectItem>
                  <SelectItem value="excellent">Excelente</SelectItem>
                  <SelectItem value="good">Bueno</SelectItem>
                  <SelectItem value="fair">Regular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Auction Settings */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-6">
          <h4 className="text-white">Configuración de Subasta</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Precio Inicial *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.startingBid}
                  onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                  required
                  disabled={loading}
                  min="1"
                  className="bg-black/50 border-white/10 text-white pl-7"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Duración *</label>
              <Select 
                value={formData.duration} 
                onValueChange={(value: string) => setFormData({ ...formData, duration: value })}
                disabled={loading}
              >
                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* --- ¡VALORES EN MINUTOS! --- */}
                  <SelectItem value="5">5 minutos (Prueba)</SelectItem>
                  <SelectItem value="10">10 minutos (Prueba)</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="360">6 horas</SelectItem>
                  <SelectItem value="720">12 horas</SelectItem>
                  <SelectItem value="1440">24 horas</SelectItem>
                  <SelectItem value="2880">2 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700 flex-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Publicando...' : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Publicar Subasta
              </>
            )}
          </Button>
          <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5" disabled={loading}>
            Guardar Borrador
          </Button>
        </div>
      </form>
    </div>
  );
}