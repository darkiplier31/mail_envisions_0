import { Product } from "@/components\ProductCard";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";

interface SupportProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Support = ({ cartItems, onAddToCart }: SupportProps) => {
  const { category } = useParams<{ category: string }>();

  const getSupportTitle = () => {
    switch(category) {
      case 'documentation':
        return 'Documentation';
      case 'contact':
        return 'Contact Us';
      case 'faq':
        return 'Frequently Asked Questions';
      default:
        return 'Dukungan (Support)';
    }
  };

  const getSupportDescription = () => {
    switch(category) {
      case 'documentation':
        return 'Access our comprehensive documentation to get the most out of our products and services.';
      case 'contact':
        return 'Reach out to our support team for personalized assistance and solutions.';
      case 'faq':
        return 'Find answers to common questions about our products, services, and implementation.';
      default:
        return 'Comprehensive support resources to help you maximize the value of our solutions.';
    }
  };

  const supportResources = [
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Comprehensive guides, tutorials, and technical documentation',
      links: [
        { name: 'Getting Started Guide', url: '#' },
        { name: 'API Documentation', url: '#' },
        { name: 'Installation Guide', url: '#' },
        { name: 'Troubleshooting', url: '#' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Get in touch with our expert support team',
      links: [
        { name: 'Email Support', url: 'mailto:support@envisions.app' },
        { name: 'Phone Support', url: 'tel:+1234567890' },
        { name: 'Live Chat', url: '#' },
        { name: 'Support Ticket', url: '#' }
      ]
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about our products and services',
      links: [
        { name: 'Account & Billing', url: '#' },
        { name: 'Technical Support', url: '#' },
        { name: 'Product Information', url: '#' },
        { name: 'Integration', url: '#' }
      ]
    }
  ];

  const displayResources = category ? supportResources.filter(res => res.id === category) : supportResources;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getSupportTitle()}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getSupportDescription()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {displayResources.map((resource) => (
            <div key={resource.id} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{resource.title}</h2>
              <p className="text-muted-foreground mb-6">{resource.description}</p>
              
              <div className="space-y-3">
                {resource.links.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                    <span className="text-foreground">{link.name}</span>
                    <a 
                      href={link.url} 
                      className="text-primary hover:underline flex items-center"
                    >
                      Open
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-secondary/30 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Need Additional Help?</h2>
            <p className="text-center text-muted-foreground mb-6">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-input bg-background rounded-lg hover:bg-accent transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;