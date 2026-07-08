import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  return onSnapshot(collection(db, PRODUCTS_COLLECTION), (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    callback(products);
  }, (error) => {
    console.error("Error subscribing to products:", error);
  });
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (productData: Omit<Product, 'id'>, imageFiles: File[]) => {
  try {
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(imageRef, file);
        return await getDownloadURL(imageRef);
      })
    );

    const newProduct = {
      ...productData,
      images: [...productData.images, ...imageUrls],
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), newProduct);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, updates);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
