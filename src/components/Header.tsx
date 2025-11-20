import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartItemCount: number;
}

const Header = ({ cartItemCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-8 w-1 bg-primary"></div>
            <span className="text-2xl font-bold text-foreground">ENVISIONS</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-auto py-2">
                <span>Produk</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/product/desk">Desk</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/product/people">People</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/product/iot">IoT</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/product/warehouse">Warehouse</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-auto py-2">
                <span>Perangkat Lunak</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/software/ai">AI</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/software/big-data">Big Data</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/software/analytics">Analytics</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Layanan
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-auto py-2">
                <span>Solusi</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/solution/object-detection">Object Detection</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/solution/command-center">Command Center</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/solution/people-tracking">People Tracking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/solution/solar-panel">Solar Panel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/solution/smart-farming">Smart Farming</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/homeowners" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pemilik rumah
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 h-auto py-2">
                <span>Dukungan</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/support/documentation">Documentation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/support/contact">Contact Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/support/faq">FAQ</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/company" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Perusahaan
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
