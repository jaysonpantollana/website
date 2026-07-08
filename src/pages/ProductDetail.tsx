import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, Terminal } from 'lucide-react';
import { mockSeller } from '../data/mockData';
import { Product } from '../types';
import { getProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-mono text-tech-muted mb-4">FETCHING_DATA...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <Terminal size={48} className="text-tech-muted mb-4" />
        <h2 className="text-2xl font-mono text-tech-text mb-4">ERR 404: COMPONENT_NOT_FOUND</h2>
        <Link to="/products" className="text-tech-accent hover:underline font-mono">{'< Return to Catalog'}</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full px-6 py-8"
    >
      <Link to="/products" className="inline-flex items-center text-xs font-mono text-tech-muted hover:text-tech-accent mb-8 transition-colors uppercase">
        <ArrowLeft size={14} className="mr-2" />
        Back to Catalog
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4 sticky top-24">
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-tech-surface border border-tech-border p-6 flex items-center justify-center bg-tech-dots relative">
            <div className="absolute top-0 left-0 bg-tech-text text-tech-surface text-[10px] font-mono px-2 py-1 m-4">
              FIG. {activeImage + 1}
            </div>
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            ) : (
              <div className="text-tech-muted font-mono text-xs">NO_IMG_AVAILABLE</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 flex-shrink-0 bg-tech-surface rounded-sm p-2 border transition-colors ${activeImage === idx ? 'border-tech-accent' : 'border-tech-border opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Product Info */}
        <div className="flex flex-col bg-tech-surface border border-tech-border p-8 rounded-sm shadow-sm">
          <div className="flex justify-between items-start border-b border-tech-border pb-6 mb-6">
            <div>
              <div className="text-xs font-mono text-tech-accent mb-2">CAT: {product.category?.toUpperCase() || 'UNCATEGORIZED'}</div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-tech-text">{product.title}</h1>
              <div className="text-xs font-mono text-tech-muted mt-2">SKU: {product.id.substring(0,8).toUpperCase()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-tech-muted mb-1">MSRP</div>
              <div className="text-2xl font-mono font-medium text-tech-text">${product.price.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="prose prose-sm text-tech-text mb-8 font-sans leading-relaxed">
            <p>{product.description}</p>
          </div>
          {/* Specs Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-mono text-tech-muted mb-3 uppercase tracking-wider">Technical Specifications</h3>
              <div className="border border-tech-border rounded-sm overflow-hidden">
                <table className="w-full text-sm font-mono text-left">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-tech-bg' : 'bg-tech-surface'}>
                        <th className="py-2 px-4 border-b border-tech-border text-tech-muted font-normal w-1/3">{key}</th>
                        <td className="py-2 px-4 border-b border-tech-border text-tech-text">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="mb-10 flex items-center gap-4 border-l-4 border-tech-border pl-4">
            <div className="text-xs font-mono text-tech-muted uppercase">Inventory Status</div>
            {product.stock > 0 ? (
              <div className="text-sm font-mono text-tech-text bg-tech-bg px-2 py-1 rounded-sm border border-tech-border">
                IN_STOCK [{product.stock.toString().padStart(3, '0')}]
              </div>
            ) : (
              <div className="text-sm font-mono text-tech-muted bg-tech-bg px-2 py-1 rounded-sm border border-tech-border">
                DEPLETED [000]
              </div>
            )}
          </div>
          {/* Seller Contact Box */}
          <div className="mt-auto bg-tech-text p-6 rounded-sm text-tech-surface">
            <h3 className="text-lg font-display font-bold mb-2">Acquisition Inquiry</h3>
            <p className="text-sm font-sans text-tech-border mb-6">
              Contact {mockSeller.name} procurement to initiate an order.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${mockSeller.phone}`}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-tech-surface text-tech-text hover:bg-tech-border transition-colors font-mono text-xs rounded-sm uppercase"
              >
                <Phone size={16} className="mr-2" />
                Init Voice
              </a>
              <a 
                href={`mailto:sales@apexsystems.local?subject=Inquiry: ${product.id.substring(0,8).toUpperCase()}`}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-tech-border text-tech-surface hover:bg-tech-surface/10 transition-colors font-mono text-xs rounded-sm uppercase"
              >
                <Mail size={16} className="mr-2" />
                Transmit Msg
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
