import { Link } from 'react-router-dom'
import { Truck, Mail, Phone, MapPin } from 'lucide-react'

export function AppFooter() {
  return (
    <footer id="contact" className="bg-gradient-to-r from-gray-950 via-orange-950 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Rodio<span className="text-primary">.</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              India&apos;s premium transport management platform connecting customers, transporters, and brokers seamlessly.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-primary">Services</a></li>
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              <li><Link to="/search" className="hover:text-primary">Search Loads</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">For Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register?role=transporter" className="hover:text-primary">Become Transporter</Link></li>
              <li><Link to="/register?role=broker" className="hover:text-primary">Become Broker</Link></li>
              <li><Link to="/register?role=customer" className="hover:text-primary">Ship with Rodio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> rodiotransport@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 8319501708</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Indore, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rodio Transport System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default AppFooter;
