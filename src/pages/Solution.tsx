import { Product } from "@/components/ProductCard";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";

interface SolutionProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Solution = ({ cartItems, onAddToCart }: SolutionProps) => {
  const { category } = useParams<{ category: string }>();

  const getSolutionTitle = () => {
    switch(category) {
      case 'object-detection':
        return 'Object Detection - Image recognition and object positioning';
      case 'command-center':
        return 'Command Center - Asset monitoring dashboard';
      case 'people-tracking':
        return 'People Tracking in Indoor Maps - BLE-based indoor positioning';
      case 'solar-panel':
        return 'Solar Panel - Energy usage monitoring';
      case 'smart-farming':
        return 'Smart Farming - Plant monitoring for productivity increase';
      default:
        return 'Solution Portfolio';
    }
  };

  const getSolutionDescription = () => {
    switch(category) {
      case 'object-detection':
        return 'Advanced image recognition and object positioning for intelligent monitoring and automation.';
      case 'command-center':
        return 'Centralized asset monitoring dashboard for comprehensive oversight and control.';
      case 'people-tracking':
        return 'BLE-based indoor positioning for precise people tracking in indoor environments.';
      case 'solar-panel':
        return 'Energy usage monitoring for solar panel installations to optimize efficiency.';
      case 'smart-farming':
        return 'Plant monitoring solutions to increase productivity and optimize farming operations.';
      default:
        return 'Specific use case solutions designed to address your unique business challenges.';
    }
  };

  const solutions = [
    {
      id: 'object-detection',
      title: 'Object Detection',
      description: 'Image recognition and object positioning',
      features: ['Real-time Recognition', 'Position Tracking', 'Automated Alerts']
    },
    {
      id: 'command-center',
      title: 'Command Center',
      description: 'Asset monitoring dashboard',
      features: ['Centralized Monitoring', 'Real-time Data', 'Custom Dashboards']
    },
    {
      id: 'people-tracking',
      title: 'People Tracking in Indoor Maps',
      description: 'BLE-based indoor positioning',
      features: ['Indoor Positioning', 'Real-time Tracking', 'Path Analysis']
    },
    {
      id: 'solar-panel',
      title: 'Solar Panel',
      description: 'Energy usage monitoring',
      features: ['Energy Monitoring', 'Performance Analytics', 'Optimization Insights']
    },
    {
      id: 'smart-farming',
      title: 'Smart Farming',
      description: 'Plant monitoring for productivity increase',
      features: ['Plant Health Monitoring', 'Growth Analytics', 'Automated Alerts']
    }
  ];

  const displaySolutions = category ? solutions.filter(sol => sol.id === category) : solutions;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getSolutionTitle()}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getSolutionDescription()}
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displaySolutions.map((solution) => (
            <div key={solution.id} className="border rounded-lg p-6 bg-card">
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
      </div>
    </div>
  );
};

export default Solution;