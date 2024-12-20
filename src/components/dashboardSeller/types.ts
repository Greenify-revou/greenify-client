export interface Product {
    id: number;
    seller_id: number;
    product_name: string;
    price: number;
    discount: number | null;
    product_desc: string;
    stock: number;
    min_stock: number;
    is_out_of_stock: boolean;
    category_id: number;
    eco_point: number;
    recycle_material_percentage: number;
    image_url: string | null;
    category_name: string | null;
  }
  
  export interface Category {
    id: number;
    category_name: string;
  }
  