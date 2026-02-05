import BrowReveal from "@/components/BrowReveal";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-[#F8F2EC] min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Scrollytelling Section */}
      <div className="relative z-20">
        <BrowReveal />
      </div>

      {/* Services & Pricing Section */}
      <section id="services" className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Precision Brows", price: "£30", desc: "Consultation, mapping, waxing, trimming & tweezing." },
            { title: "Signature Wax", price: "£15", desc: "Gentle hair removal for clean definitions." },
            { title: "Custom Tint", price: "£15", desc: "Color matching to enhance fullness and depth." },
          ].map((service, i) => (
            <div key={i} className="border border-[#1B1B1B]/10 p-12 hover:border-[#A28660] transition-colors duration-300 group">
              <h3 className="text-2xl font-light text-[#1B1B1B] mb-2">{service.title}</h3>
              <div className="text-[#A28660] text-xl mb-4 font-light">{service.price}</div>
              <p className="text-[#1B1B1B]/60 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#F2EBE5]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#1B1B1B] mb-8">The Studio</h2>
          <p className="text-[#1B1B1B]/70 text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Located in the heart of London, Sculpt By Elizabeth is a sanctuary for bespoke brow artistry.
            We believe that eyebrows are the framework of the face, and every treatment is tailored
            specifically to your unique bone structure and style.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-light text-[#1B1B1B] mb-12 text-center">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How long does a session take?", a: "Precision brows take 30-45 minutes. Tinting adds 15 minutes." },
            { q: "Do I need a patch test?", a: "Yes, a patch test is required 24 hours before your first tinting appointment." },
            { q: "How long do results last?", a: "Waxing lasts 3-4 weeks. Tinting lasts 2-3 weeks depending on your skin type." },
            { q: "Can I wear makeup to my appointment?", a: "Please arrive with clean brows if possible, though we can remove makeup for you." },
            { q: "Do you offer lash services?", a: "Currently we specialize exclusively in brows to ensure the highest quality results." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-[#1B1B1B]/10 pb-4">
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center text-lg text-[#1B1B1B] font-light list-none">
                  {faq.q}
                  <span className="opacity-40 group-open:rotate-180 transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 text-[#1B1B1B]/60 font-light">{faq.a}</p>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-32 bg-[#1B1B1B] text-[#F8F2EC] text-center px-4">
        <h2 className="text-4xl md:text-5xl font-light mb-8">Ready for your transformation?</h2>
        <p className="text-[#F8F2EC]/60 mb-12 max-w-md mx-auto font-light">
          Bookings are released monthly. Please secure your slot in advance.
        </p>
        <button className="bg-[#A28660] text-white px-10 py-5 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#1B1B1B] transition-colors duration-300">
          Book Appointment
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F8F2EC] border-t border-[#1B1B1B]/5 text-center">
        <p className="text-[#1B1B1B]/30 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Sculpt By Elizabeth. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
