import { useState } from "react";
import { Send } from "lucide-react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up your submit logic here (API call, email service, etc.)
    console.log(form);
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/30";

  return (
    <>
      <div className="rounded-2xl border border-white/[0.06] bg-[#091424] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] sm:p-8">
        <h3 className="text-2xl font-black text-white sm:text-3xl">
          Send me a message
        </h3>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Share a few details below and I'll get right back to you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Name <span className="text-emerald-400">*</span>
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Email <span className="text-emerald-400">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Phone <span className="text-slate-500">(optional)</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+880 1XXX XXXXXX"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Subject <span className="text-emerald-400">*</span>
              </label>
              <input
                required
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. WordPress website"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Message <span className="text-emerald-400">*</span>
            </label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell me about your project, goals, and timeline..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 py-3.5 font-bold text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:from-emerald-300 hover:to-teal-400"
          >
            Send Message
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
