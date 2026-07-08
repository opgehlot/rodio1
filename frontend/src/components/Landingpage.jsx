import { motion } from 'framer-motion'
import { FileText, Gavel, Truck, CheckCircle } from 'lucide-react'

const steps = [
  { icon: FileText, step: '01', title: 'Post Your Load', desc: 'Enter pickup, destination, weight, and budget details.' },
  { icon: Gavel, step: '02', title: 'Receive Bids', desc: 'Verified transporters compete with their best prices.' },
  { icon: Truck, step: '03', title: 'Assign & Track', desc: 'Accept the best bid and track your shipment live.' },
  { icon: CheckCircle, step: '04', title: 'Deliver & Review', desc: 'Complete delivery, pay securely, and leave a review.' },
]

export function Landingpage() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-slate-600 ">Four simple steps to move your freight</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white shadow-lg shadow-blue-500/30">
                <item.icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold text-primary">{item.step}</span>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 ">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = ['Real-time Bidding', 'Live GPS Tracking', 'Secure Payments', 'Multi-role Dashboard', 'Instant Notifications', 'Document Management']
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">Powerful Features</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((f) => (
            <span key={f} className="rounded-full border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors ">
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingSection() {
 
  return (
    

<div class="w-full max-w-sm p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs mx-auto">
    <h5 class="mb-4 text-xl font-medium text-body">Standard plan</h5>
    <div class="flex items-baseline text-heading">
        <span class="text-5xl font-extrabold tracking-tight">$49</span>
        <span class="ms-2 font-medium text-body">/month</span>
    </div>
    <ul role="list" class="space-y-4 my-6">
        <li class="flex items-center">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">2 team members</span>
        </li>
        <li class="flex items-center">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">20GB Cloud storage</span>
        </li>
        <li class="flex items-center">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">Integration help</span>
        </li>
        <li class="flex items-center line-through decoration-body">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">Sketch Files</span>
        </li>
        <li class="flex items-center line-through decoration-body">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">API Access</span>
        </li>
        <li class="flex items-center line-through decoration-body">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">Complete documentation</span>
        </li>
        <li class="flex items-center line-through decoration-body">
            <svg class="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <span class="text-body">24×7 phone & email support</span>
        </li>
    </ul>
    <button type="button" class="w-full text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Choose plan</button>
</div>


    
  )
}

export function FAQSection() {
  const faqs = [
    { q: 'How do I post a load?', a: 'Register as a customer, fill in load details, and publish. Transporters will bid on your load.' },
    { q: 'Are transporters verified?', a: 'Yes, all transporters go through document verification including GST, RC, and insurance.' },
    { q: 'How does payment work?', a: 'Payments are processed securely via Razorpay with advance and full payment options.' },
    { q: 'Can I track my shipment?', a: 'Yes, live GPS tracking with ETA updates is available for all active bookings.' },
  ]
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border p-4 ">
              <summary className="font-semibold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-sm text-slate-600 ">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}


export function TestimonialsSection() {
  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Manufacturing Co.', text: 'Rodio reduced our logistics costs by 30%. The bidding system is fantastic.' },
    { name: 'Priya Sharma', role: 'Transporter', text: 'Best platform for finding loads. My fleet utilization improved significantly.' },
    { name: 'Amit Patel', role: 'Broker', text: 'Managing multiple clients and loads has never been easier.' },
  ]
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white p-6 shadow-sm ">
              <p className="text-slate-600  italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Landingpage;