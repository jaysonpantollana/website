import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { addProduct } from '../services/productService';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await addProduct({
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        images: [],
        created_at: new Date().toISOString()
      }, images);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setImages([]);
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-tech-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-tech-surface border border-tech-border rounded-sm shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-tech-border">
          <h2 className="text-xl font-display font-bold text-tech-text uppercase tracking-wider">Append_Record</h2>
          <button onClick={onClose} className="text-tech-muted hover:text-tech-accent transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-sm">
              <p className="text-red-400 text-xs font-mono">{error}</p>
            </div>
          )}
          <form id="addProductForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">MSRP ($)</label>
                <input required type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Inventory Stock</label>
                <input required type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-2 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-mono text-sm" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Description</label>
              <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 bg-tech-bg border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent text-tech-text font-sans text-sm resize-none"></textarea>
            </div>

            <div>
              <label className="block text-xs font-mono text-tech-muted mb-2 uppercase">Images</label>
              <div className="border border-dashed border-tech-border rounded-sm p-8 flex flex-col items-center justify-center text-tech-muted hover:bg-tech-bg hover:border-tech-accent transition-colors relative cursor-pointer bg-tech-surface">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files));
                    }
                  }} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={32} className="mb-2 opacity-50" />
                <span className="text-xs font-mono">
                  {images.length > 0 ? `${images.length} FILE(S) SELECTED` : 'UPLOAD_ASSETS (DRAG OR CLICK)'}
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-tech-border flex justify-end">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2 bg-transparent text-tech-muted hover:text-tech-text rounded-sm font-mono text-xs uppercase tracking-wider mr-4 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="addProductForm"
            disabled={loading}
            className="px-6 py-2 bg-tech-text text-tech-surface rounded-sm font-mono text-xs uppercase tracking-wider hover:bg-tech-accent transition-colors disabled:opacity-50"
          >
            {loading ? 'EXECUTING...' : 'COMMIT_RECORD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
