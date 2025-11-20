import { Product } from "@/components/ProductCard";
import Header from "@/components/Header";

interface AboutProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const About = ({ cartItems, onAddToCart }: AboutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Envisions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our journey in transforming businesses and homes through innovative technology solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Envisions, we are committed to driving digital transformation through cutting-edge technology solutions. 
              Our focus is on IoT, AI, analytics, and big data infrastructure that empowers businesses and homeowners 
              to achieve greater efficiency, productivity, and connectivity.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that technology should be accessible, intuitive, and valuable. Our solutions are designed 
              to bridge the gap between complex technological capabilities and practical, everyday applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To create a connected world where technology seamlessly enhances every aspect of business operations 
                and personal life, making complex systems intuitive and efficient.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
              <p className="text-muted-foreground">
                We combine deep technical expertise with a user-centric approach to deliver solutions that are 
                not only technologically advanced but also practical and valuable in real-world applications.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Digital Experience?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Contact us today to learn how our technology solutions can help your business or home.
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;