import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sprout className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Thalia</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering Nepalese farmers with smart agriculture tools and data-driven insights.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Districts</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="cursor-pointer hover:text-primary transition-colors">FAQ</span></li>
            <li><span className="cursor-pointer hover:text-primary transition-colors">Expert Advice</span></li>
            <li><span className="cursor-pointer hover:text-primary transition-colors">Feedback</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span></li>
            <li><span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span></li>
            <li><span className="cursor-pointer hover:text-primary transition-colors">Contact Us</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 Thalia. Built for Nepalese farmers.
      </div>
    </div>
  </footer>
);

export default Footer;
