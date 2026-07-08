import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { mockSeller } from '../../data/mockData';
import { Product } from '../../types';
import { subscribeToProducts, deleteProduct } from '../../services/productService';
import AddProductModal from '../../components/AddProductModal';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((newProducts) => {
      setProducts(newProducts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('SYS.CONFIRM: Permanently delete this component?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-8 bg-tech-surface p-6 border border-tech-border rounded-sm shadow-sm">
        <h1 className="text-2xl font-display font-bold text-tech-text">DASHBOARD_CTRL</h1>
        {activeTab === 'products' && (
          <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-tech-text text-tech-surface rounded-sm hover:bg-tech-accent transition-colors font-mono text-xs uppercase tracking-wider">
            <Plus size={14} className="mr-2" />
            Append_Record
          </button>
        )}
      </div>

      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-t-sm border-t border-l border-r transition-colors ${activeTab === 'products' ? 'border-tech-border bg-tech-surface text-tech-text border-b-transparent' : 'border-transparent text-tech-muted hover:text-tech-text bg-tech-border/30'}`}
        >
          Tbl_Products
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-t-sm border-t border-l border-r transition-colors ${activeTab === 'settings' ? 'border-tech-border bg-tech-surface text-tech-text border-b-transparent' : 'border-transparent text-tech-muted hover:text-tech-text bg-tech-border/30'}`}
        >
          Config_Global
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-tech-surface rounded-sm shadow-sm border border-tech-border overflow-hidden -mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-tech-bg border-b border-tech-border text-xs font-mono uppercase tracking-wider text-tech-muted">
                <th className="p-4 font-normal">Component</th>
                <th className="p-4 font-normal">MSRP</th>
                <th className="p-4 font-normal">Inventory</th>
                <th className="p-4 font-normal text-right">Execute</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-tech-muted font-mono text-xs">LOADING_DATA...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-tech-muted font-mono text-xs">NO_RECORDS_FOUND</td></tr>
              ) : products.map((product) => (
                <tr key={product.id} className="border-b border-tech-border hover:bg-tech-bg/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-sm bg-tech-bg border border-tech-border overflow-hidden mr-4 flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover mix-blend-multiply" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-tech-muted text-xs">NO_IMG</div>
                        )}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-tech-text">{product.title}</div>
                        <div className="text-xs font-mono text-tech-muted">ID: {product.id.substring(0, 8).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-tech-text">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="font-mono text-tech-text">
                      {product.stock.toString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-tech-muted hover:text-tech-accent p-2 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-tech-muted hover:text-red-500 p-2 transition-colors ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-tech-surface rounded-sm shadow-sm border border-tech-border p-6 md:p-8 max-w-2xl -mt-6">
          <h2 className="text-lg font-display font-bold text-tech-text mb-6 uppercase">SYS.CONFIG</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-tech-muted mb-1">VENDOR_NAME</label>
              <input type="text" defaultValue={mockSeller.name} className="w-full px-4 py-2 border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent font-sans bg-tech-bg text-tech-text" />
            </div>
            <div>
              <label className="block text-xs font-mono text-tech-muted mb-1">CONTACT_NO</label>
              <input type="tel" defaultValue={mockSeller.phone} className="w-full px-4 py-2 border border-tech-border rounded-sm focus:outline-none focus:border-tech-accent font-mono bg-tech-bg text-tech-text" />
            </div>
            
            <div className="pt-6 border-t border-tech-border">
              <h3 className="text-xs font-mono text-tech-text mb-4 uppercase">Hero_Graphic_Asset</h3>
              <div className="border border-dashed border-tech-border rounded-sm p-8 flex flex-col items-center justify-center text-tech-muted hover:bg-tech-bg hover:border-tech-accent transition-colors cursor-pointer bg-tech-surface">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <span className="text-xs font-mono">UPLOAD_NEW_ASSET</span>
              </div>
            </div>
            <div className="pt-6 flex justify-end border-t border-tech-border">
              <button type="button" className="px-6 py-2 bg-tech-text text-tech-surface rounded-sm font-mono text-xs uppercase tracking-wider hover:bg-tech-accent transition-colors">
                COMMIT_CHANGES
              </button>
            </div>
          </form>
        </div>
      )}

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AdminDashboard;
