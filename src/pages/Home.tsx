import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { mockSeller } from '../data/mockData';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center min-h-[80vh] px-6 py-12 bg-tech-dots">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full my-auto bg-tech-surface border border-tech-border shadow-sm rounded-sm flex flex-col md:flex-row overflow-hidden text-left"
      >
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-tech-text mb-6 uppercase">
            Engineered for <br /><span className="text-tech-accent">Performance</span>
          </h1>
          <p className="text-lg text-tech-muted mb-10 font-sans max-w-xl">
            Welcome to {mockSeller.name}. We source and supply precision-crafted computing hardware and components for professionals who demand uncompromising reliability.
          </p>
          
          <div>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-mono font-bold text-tech-surface bg-tech-text hover:bg-tech-accent transition-colors shadow-sm rounded-sm uppercase tracking-wider"
            >
              View Products
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative group bg-tech-bg border-t md:border-t-0 md:border-l border-tech-border">
          <div className="absolute inset-0 bg-tech-accent/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80" 
            alt="High performance hardware" 
            className="w-full h-[40vh] md:h-[60vh] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 right-4 bg-tech-surface/90 backdrop-blur text-tech-text font-mono text-xs px-3 py-1 border border-tech-border z-20">
            IMG_REF: 0x8F785B
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
