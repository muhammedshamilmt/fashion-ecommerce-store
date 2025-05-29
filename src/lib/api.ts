import { Product } from '@/types/product';

interface GetProductsParams {
  category?: string;
  page?: number;
  limit?: number;
}

export async function getProducts({ category, page = 1, limit = 12 }: GetProductsParams = {}): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
} 