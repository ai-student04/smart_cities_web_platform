import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-primary-400" aria-hidden="true" />
              <span className="text-lg font-display font-bold text-white">
                Smart Cities Jordan
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Building sustainable, innovative, and connected cities for a better future in Jordan.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/urban-planning"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  Urban Planning
                </Link>
              </li>
              <li>
                <Link
                  to="/transportation"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  Transportation
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2" role="list">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm">
                  Ministry of Digital Economy
                  <br />
                  Amman, Jordan
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+96265001234"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  +962 6 500 1234
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@smartcities.jo"
                  className="text-sm hover:text-primary-400 transition-colors focus:outline-none focus:underline"
                >
                  info@smartcities.jo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                In partnership with the Government of Jordan
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Smart Cities Jordan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
