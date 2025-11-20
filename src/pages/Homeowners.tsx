import { Product } from "@/components/ProductCard";
import Header from "@/components/Header";

interface HomeownersProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Homeowners = ({ cartItems, onAddToCart }: HomeownersProps) => {
  const homeownerSolutions = [
    {
      id: 'smart-home',
      title: 'Smart Home Integration',
      description: 'Connect and control all your home devices seamlessly',
      features: ['Remote Control', 'Energy Monitoring', 'Security Integration']
    },
    {
      id: 'energy-monitoring',
      title: 'Energy Usage Monitoring',
      description: 'Track and optimize your home energy consumption',
      features: ['Real-time Data', 'Usage Analytics', 'Savings Recommendations']
    },
    {
      id: 'security-systems',
      title: 'Smart Security Systems',
      description: 'Advanced monitoring for your home safety',
      features: ['24/7 Surveillance', 'Mobile Alerts', 'Remote Access']
    },
    {
      id: 'automated-control',
      title: 'Home Automation',
      description: 'Automate lighting, climate, and appliances',
      features: ['Scheduled Control', 'Voice Integration', 'Energy Efficiency']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pemilik Rumah (Homeowners)
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart home solutions leveraging IoT technology to enhance your living experience with connected devices, energy monitoring, and security systems.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {homeownerSolutions.map((solution) => (
            <div key={solution.id} className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
              <p className="text-muted-foreground mb-4">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Transform Your Living Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Our IoT-powered solutions bring convenience, efficiency, and security to your home, helping you save energy and stay connected.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">90%</div>
              <div className="text-sm text-muted-foreground">Energy Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Smart</div>
              <div className="text-sm text-muted-foreground">Automation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeowners;