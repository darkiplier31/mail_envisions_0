import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "@/components/ProductCard";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ProductCategory from "./pages/ProductCategory";
import Software from "./pages/Software";
import Services from "./pages/Services";
import Solution from "./pages/Solution";
import Homeowners from "./pages/Homeowners";
import Support from "./pages/Support";
import Company from "./pages/Company";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === productId);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/about"
              element={<About cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/product/:category"
              element={<ProductCategory cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/software/:category"
              element={<Software cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/services"
              element={<Services cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/solution/:category"
              element={<Solution cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/homeowners"
              element={<Homeowners cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/support/:category"
              element={<Support cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/company"
              element={<Company cartItems={cartItems} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
