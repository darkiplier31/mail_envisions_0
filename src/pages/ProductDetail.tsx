import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";
import { Product } from "@/components/ProductCard";

interface ProductDetailProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductDetail = ({ cartItems, onAddToCart }: ProductDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={cartItems.length} />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
        <ChatWidget />
      </div>
    );
  }

  const features = [
    "Real-time monitoring and data acquisition",
    "IoT connectivity for remote access",
    "High-precision sensors",
    "Intuitive control interface",
    "Professional-grade construction",
    "1-year warranty included",
  ];

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />

      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground">USD</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Features:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 group"
              >
                <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </Button>
            </div>

            <div className="pt-6 border-t space-y-2">
              <p className="text-sm text-muted-foreground">
                ✓ Free shipping on orders over $1000
              </p>
              <p className="text-sm text-muted-foreground">
                ✓ Professional installation support available
              </p>
              <p className="text-sm text-muted-foreground">
                ✓ 30-day return policy
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default ProductDetail;
