import { Product } from "@/components/ProductCard";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { products } from "@/data/products";

interface ProductCategoryProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductCategory = ({ cartItems, onAddToCart }: ProductCategoryProps) => {
  const { category } = useParams<{ category: string }>();

  // Filter products based on category
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category?.toLowerCase()
  );

  // If no specific products, show all
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  const getCategoryTitle = () => {
    switch(category) {
      case 'desk':
        return 'Desk - Real-time data input via ticketing system';
      case 'people':
        return 'People - Asset management and response tracking';
      case 'iot':
        return 'IoT - End-to-end IoT solutions for connecting assets';
      case 'warehouse':
        return 'Warehouse - Stock movement information for assets';
      default:
        return 'Our Products';
    }
  };

  const getCategoryDescription = () => {
    switch(category) {
      case 'desk':
        return 'Real-time data input via ticketing system (150K per user)';
      case 'people':
        return 'Asset management and response tracking (25K per user)';
      case 'iot':
        return 'End-to-end IoT solutions for connecting assets';
      case 'warehouse':
        return 'Stock movement information for assets';
      default:
        return 'Professional-grade monitoring panels designed for reliability and precision';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getCategoryTitle()}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getCategoryDescription()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;