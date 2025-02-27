"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCallSupport = () => {
    window.location.href = "tel:1-800-555-0123";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            better
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/mortgage-calculator"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/about-us"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            About Us
          </Link>
          <Button
            onClick={handleCallSupport}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call Support 1-800-555-0123
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/mortgage-calculator"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Button
              onClick={handleCallSupport}
              className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 w-full"
            >
              <Phone className="h-4 w-4" />
              Call Support
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
