import logo from "../assets/icon.png";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Vitalis Logo"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold">Vitalis</span>
            </div>
            <p className="text-muted-foreground">
              Smart Real-time Crop Health Monitoring, Disease Detection and
              Management Hub
            </p>
            <div className="flex space-x-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook size={20} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter size={20} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram size={20} />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Features
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Pricing
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Integrations
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  API
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Documentation
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Blog
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Community
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  About
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Privacy
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary">
                  Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>© 2025 Vitalis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
