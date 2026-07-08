import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Product } from '../types';
import { fetchProducts } from '../services/productService';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);
    
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-tech-border pb-6">
        <h1 className="text-3xl font-display font-bold tracking-tight text-tech-text uppercase">Hardware_Index</h1>
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tech-muted" />
          <input 
            type="text" 
            placeholder="Search specs or components..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-tech-border bg-tech-surface text-tech-text font-mono text-sm focus:outline-none focus:border-tech-accent rounded-sm transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-tech-muted font-mono">
          {'>'} FETCHING_REMOTE_DATA...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-tech-muted font-mono">
          {'>'} ERR: NO_MATCHING_COMPONENTS_FOUND
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group h-full"
            >
              <Link to={`/products/${product.id}`} className="flex flex-col h-full bg-tech-surface border border-tech-border hover:border-tech-accent transition-colors rounded-sm overflow-hidden">
                <div className={`relative aspect-[4/3] bg-tech-bg border-b border-tech-border ${product.stock === 0 ? 'opacity-50 grayscale' : ''}`}>
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="object-cover w-full h-full p-4 mix-blend-multiply"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-tech-muted text-xs">NO_IMG</div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-0 right-0 bg-tech-text text-tech-surface text-xs font-mono px-2 py-1 m-4 rounded-sm">
                      STATUS: DEPLETED
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 bg-tech-surface/80 backdrop-blur border-t border-r border-tech-border text-tech-muted text-[10px] font-mono px-2 py-1">
                    ID: {product.id.substring(0, 8).toUpperCase()}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-mono text-tech-accent mb-2">{product.category?.toUpperCase() || 'UNCATEGORIZED'}</div>
                  <h3 className="text-lg font-display font-semibold text-tech-text mb-4 leading-tight group-hover:text-tech-accent transition-colors">{product.title}</h3>
                  
                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-tech-border pt-4">
                    <div>
                      <div className="text-[10px] text-tech-muted font-mono mb-1">MSRP_USD</div>
                      <div className="font-mono text-tech-text">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-tech-muted font-mono mb-1">Available</div>
                      {product.stock > 0 ? (
                        <div className="font-mono text-tech-text">
                          {product.stock.toString().padStart(3, '0')}
                        </div>
                      ) : (
                        <div className="font-mono text-tech-muted">000</div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
