import { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { categories } from '../../lib/mockData';

export function UploadProduct() {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startingBid: '',
    duration: '24',
    condition: 'new'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Artículo publicado exitosamente! Tu subasta comenzará pronto.');
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      startingBid: '',
      duration: '24',
      condition: 'new'
    });
    setImages([]);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h3 className="text-white mb-2">Subir Artículo</h3>
        <p className="text-white/60">Completa la información de tu producto para crear una subasta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Images Upload */}
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
          <h4 className="text-white mb-4">Imágenes del Producto</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden group">
                <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            
            {images.length < 8 && (
              <label className="aspect-square bg-zinc-800 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-600/50 transition-colors">
                <ImageIcon className="w-8 h-8 text-white/40 mb-2" />
                <span className="text-white/60 text-sm">Subir</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <p className="text-white/40 text-sm">
            Puedes subir hasta 8 imágenes. La primera será la imagen principal.
          </p>
        </div>

        {/* Basic Information */}
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
              rows={6}
              className="bg-black/50 border-white/10 text-white resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Categoría *</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
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
                  min="1"
                  className="bg-black/50 border-white/10 text-white pl-7"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Duración *</label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="3">3 horas</SelectItem>
                  <SelectItem value="6">6 horas</SelectItem>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="48">2 días</SelectItem>
                  <SelectItem value="168">7 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Publicar Subasta
          </Button>
          <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5">
            Guardar Borrador
          </Button>
        </div>
      </form>
    </div>
  );
}
