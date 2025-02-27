import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Mortgage</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Refinance</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Home Equity</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Cash-Out Refinance</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">FHA Loans</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/mortgage-calculator" className="text-gray-600 hover:text-blue-600">Mortgage Calculator</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Affordability Calculator</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Refinance Calculator</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Learning Center</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Press</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li><Link href="/start" className="text-gray-600 hover:text-blue-600">Apply Now</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Check Rates</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Preapproval</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600">Refinance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                better
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              <p>© 2025 Better. All rights reserved.</p>
              <p>NMLS #330511</p>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>Equal Housing Opportunity | Privacy Policy | Terms of Use | Licensing Information</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;