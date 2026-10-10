import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, Compass, Code, Globe, ExternalLink } from 'lucide-react';

export default function ContactCampsite() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-24 px-4 bg-[#080503] glow-campfire overflow-hidden">
      
      {/* Background Telegraph Wires */}
      <div className="absolute top-10 left-0 right-0 h-0.5 bg-[#4a2e1b]/30 pointer-events-none" />
      <div className="absolute top-12 left-0 right-0 h-0.5 bg-[#4a2e1b]/20 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#180d07] border-2 border-[#8b0000] rounded-sm text-xs font-rdr-typewriter text-[#d4af37]">
            <Compass className="w-4 h-4 text-[#8b0000] animate-spin" />
            <span>EARLY-DAWN CAMPSITE & PACIFIC TELEGRAPH OFFICE</span>
          </div>
          <h2 className="font-rdr-title text-4xl sm:text-6xl text-[#e6d2b5] tracking-wider">
            DISPATCH A <span className="text-[#8b0000]">TELEGRAPH</span>
          </h2>
          <p className="font-rdr-journal text-2xl text-[#d4af37] italic max-w-xl mx-auto">
            "Send word to the camp for engineering roles, software projects, or collaboration."
          </p>
        </motion.div>

        {/* Contact Form & Dossier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Outlaw Contact Info Dossier */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-wanted-paper p-6 sm:p-8 border-4 border-[#8b0000] rounded-sm text-[#1a0e08] shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Rivets */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />

            <div className="border-b-2 border-[#8b0000] pb-4">
              <span className="font-rdr-title text-xs text-[#8b0000] tracking-widest font-bold block">CAMPSITE LOCATION</span>
              <h3 className="font-rdr-title text-2xl font-bold text-[#1a0e08]">HARISH MAGULURI</h3>
              <p className="font-rdr-typewriter text-xs text-[#543520] font-bold">FULL-STACK & SOFTWARE ENGINEER</p>
            </div>

            <div className="space-y-4 font-rdr-typewriter text-xs">
              <div className="flex items-center gap-3 p-3 bg-[#120a06] text-[#e6d2b5] rounded-xs border border-[#8b0000]">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#a88968] uppercase">CURRENT BASE</p>
                  <p className="font-bold">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#120a06] text-[#e6d2b5] rounded-xs border border-[#8b0000]">
                <Mail className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#a88968] uppercase">TELEGRAPH EMAIL</p>
                  <a href="mailto:maguluriharish3@gmail.com" className="font-bold text-[#ffcc00] hover:underline">
                    maguluriharish3@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#120a06] text-[#e6d2b5] rounded-xs border border-[#8b0000]">
                <Phone className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#a88968] uppercase">CAMPSITE WIRE</p>
                  <a href="tel:+919392437648" className="font-bold text-[#ffcc00] hover:underline">
                    +91 93924 37648
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-[#8b0000]/30 flex flex-wrap gap-3">
              <a
                href="https://github.com/harishhari3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a0e08] text-[#d4af37] font-rdr-title text-xs rounded-xs border border-[#8b0000] hover:bg-[#8b0000] hover:text-[#ffcc00] transition-colors flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                <span>GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://linkedin.com/in/harish-maguluri"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a0e08] text-[#d4af37] font-rdr-title text-xs rounded-xs border border-[#8b0000] hover:bg-[#8b0000] hover:text-[#ffcc00] transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>

          {/* Right Side: Dispatch Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#160d08] p-6 sm:p-8 border-4 border-[#8b0000] rounded-sm text-[#e6d2b5] shadow-2xl space-y-6"
          >
            <div className="border-b border-[#4a2e1b] pb-3">
              <h3 className="font-rdr-title text-2xl text-[#d4af37]">ENCRYPTED TELEGRAPH DISPATCH</h3>
              <p className="font-rdr-typewriter text-xs text-[#c4a682]">Fill out the telegram form to send a direct message to Harish.</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-[#8b0000] border-2 border-[#d4af37] text-center rounded-sm space-y-2"
              >
                <CheckCircle className="w-10 h-10 text-[#ffcc00] mx-auto animate-bounce" />
                <h4 className="font-rdr-title text-xl text-[#ffcc00]">TELEGRAM SENT SUCCESSFULLY!</h4>
                <p className="font-rdr-typewriter text-xs text-[#e6d2b5]">
                  Your message has been dispatched via steam express to Harish. He will reply shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-rdr-typewriter text-xs">
                <div className="space-y-1">
                  <label className="text-[#d4af37] font-bold block uppercase">YOUR NAME / OUTLAW HANDLE</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Arthur Morgan"
                    className="w-full p-3 bg-[#0d0704] border-2 border-[#4a2e1b] focus:border-[#8b0000] text-[#e6d2b5] rounded-xs outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#d4af37] font-bold block uppercase">YOUR TELEGRAPH EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., arthur@van-der-linde-gang.com"
                    className="w-full p-3 bg-[#0d0704] border-2 border-[#4a2e1b] focus:border-[#8b0000] text-[#e6d2b5] rounded-xs outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#d4af37] font-bold block uppercase">DISPATCH MESSAGE / JOB DETAILS</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your telegram message here..."
                    className="w-full p-3 bg-[#0d0704] border-2 border-[#4a2e1b] focus:border-[#8b0000] text-[#e6d2b5] rounded-xs outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8b0000] border-2 border-[#d4af37] text-[#ffcc00] font-rdr-title text-sm uppercase tracking-widest hover:bg-[#b31212] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT TELEGRAM DISPATCH</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
