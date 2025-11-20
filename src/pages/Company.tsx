import { Product } from "@/components\ProductCard";
import Header from "@/components/Header";

interface CompanyProps {
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
}

const Company = ({ cartItems, onAddToCart }: CompanyProps) => {
  const companySections = [
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about our mission and vision',
      content: 'Envisions is a technology company focused on digital transformation through IoT, AI, analytics, and big data infrastructure. We provide comprehensive solutions for businesses and homeowners to enhance efficiency, productivity, and connectivity through smart technology integration.'
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Stay updated with the latest industry insights',
      content: 'Our blog features articles on the latest trends in IoT, AI, and digital transformation. We share insights on technology developments, case studies, and best practices to help you stay informed about emerging technologies.'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Get in touch with our team',
      content: 'We value your feedback and inquiries. Contact us through our various channels to learn more about our products and services, request a demo, or discuss partnership opportunities.'
    }
  ];

  const companyDetails = [
    { label: 'Founded', value: '2020' },
    { label: 'Headquarters', value: 'Jakarta, Indonesia' },
    { label: 'Focus', value: 'Digital Transformation' },
    { label: 'Industries', value: 'IoT, AI, Analytics, Big Data' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perusahaan (Company)
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about our mission, vision, and commitment to digital transformation through innovative technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Envisions was founded with a vision to transform businesses and homes through the power of connected technology. 
              We leverage IoT, AI, analytics, and big data infrastructure to create solutions that enhance efficiency, 
              productivity, and connectivity across various industries.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of experts is dedicated to providing innovative solutions that help our clients navigate 
              the digital transformation journey, from initial consultation to implementation and ongoing support.
            </p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Company Information</h3>
            <div className="space-y-4">
              {companyDetails.map((detail, idx) => (
                <div key={idx} className="flex justify-between border-b pb-3">
                  <span className="text-foreground font-medium">{detail.label}</span>
                  <span className="text-muted-foreground">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Company Sections</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {companySections.map((section) => (
              <div key={section.id} className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <p className="text-foreground">{section.content}</p>
                <button className="mt-4 text-primary hover:underline">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Continuously pushing boundaries in technology</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">Delivering the highest quality solutions</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Integrity</h3>
              <p className="text-sm text-muted-foreground">Building trust through transparent practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;