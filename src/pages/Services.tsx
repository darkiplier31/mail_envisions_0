import { Product } from "@/components/ProductCard";
import Header from "@/components/Header";

interface ServicesProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Services = ({ cartItems, onAddToCart }: ServicesProps) => {
  const services = [
    {
      id: 'consulting',
      title: 'Digital Transformation Consulting',
      description: 'Expert guidance to transform your business with digital solutions',
      features: [
        'Strategic Planning',
        'Technology Assessment',
        'Implementation Roadmaps'
      ]
    },
    {
      id: 'development',
      title: 'Custom Development',
      description: 'Tailored software solutions built to meet your specific business needs',
      features: [
        'Custom Applications',
        'Integration Services',
        'API Development'
      ]
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Support',
      description: 'Ongoing support and maintenance to ensure optimal performance',
      features: [
        '24/7 Monitoring',
        'Regular Updates',
        'Technical Support'
      ]
    },
    {
      id: 'training',
      title: 'Training & Education',
      description: 'Comprehensive training programs to maximize your team\'s potential',
      features: [
        'User Training',
        'Technical Workshops',
        'Best Practices'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Layanan (Services)
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services to support your digital transformation journey with IoT, AI, analytics, and big data infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
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

export default Services;