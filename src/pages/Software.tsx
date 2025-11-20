import { Product } from "@/components/ProductCard";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";

interface SoftwareProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Software = ({ cartItems, onAddToCart }: SoftwareProps) => {
  const { category } = useParams<{ category: string }>();

  const getSoftwareTitle = () => {
    switch(category) {
      case 'ai':
        return 'AI - Artificial Intelligence Services';
      case 'big-data':
        return 'Big Data - Analytics and Infrastructure';
      case 'analytics':
        return 'Analytics - Advanced Data Processing';
      default:
        return 'Software Solutions';
    }
  };

  const getSoftwareDescription = () => {
    switch(category) {
      case 'ai':
        return 'Advanced artificial intelligence solutions to optimize your operations and decision-making processes.';
      case 'big-data':
        return 'Comprehensive big data analytics and infrastructure solutions for processing and analyzing large datasets.';
      case 'analytics':
        return 'Advanced data processing and visualization tools to extract meaningful insights from your data.';
      default:
        return 'Cutting-edge software solutions leveraging AI, Big Data, and advanced analytics to transform your business.';
    }
  };

  const softwareItems = [
    {
      id: 'ai',
      title: 'AI Services',
      description: 'Artificial Intelligence solutions to automate and optimize business processes',
      features: ['Machine Learning Models', 'Predictive Analytics', 'Automated Decision Making']
    },
    {
      id: 'big-data',
      title: 'Big Data',
      description: 'Analytics and infrastructure for processing large datasets',
      features: ['Data Lakes', 'Real-time Processing', 'Scalable Storage']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Advanced data processing and visualization tools',
      features: ['Dashboards', 'Reports', 'Data Mining']
    }
  ];

  const displayItems = category ? softwareItems.filter(item => item.id === category) : softwareItems;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getSoftwareTitle()}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getSoftwareDescription()}
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature, idx) => (
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

export default Software;