import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "motion/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// const ContactForm = () => {
//   // const [isSubmitted, setIsSubmitted] = React.useState(false);
//   // const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     },
//   });

//   async function onSubmit(values) {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/backend/contact`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         },
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         return toast.error(data.message);
//       }
//       toast.success(data.message);
//       form.reset();
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <section>
//       <div className="w-full lg:max-w-[600px] mx-auto">
//         <Card className="border-0 rounded-2xl">
//           <CardContent className="py-4">
//             <div className="text-center mb-8">
//               <h2
//                 className="lg:text-3xl text-2.9xl font-black text-[#0F172A] mb-2"
//                 font-sans
//               >
//                 Book A Free Consultation
//               </h2>
//             </div>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Name */}
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-[#003057] font-semibold">
//                           Full Name
//                         </FormLabel>

//                         <FormControl>
//                           <Input
//                             placeholder="Your Name"
//                             {...field}
//                             className="h-10"
//                           />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Email */}
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-[#003057] font-semibold">
//                           Email Address
//                         </FormLabel>

//                         <FormControl>
//                           <Input
//                             type="email"
//                             placeholder="your.email@example.com"
//                             {...field}
//                             className="h-10"
//                           />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Phone */}
//                   <FormField
//                     control={form.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-[#003057] font-semibold">
//                           Phone Number
//                         </FormLabel>

//                         <FormControl>
//                           <Input
//                             placeholder="Phone Number"
//                             {...field}
//                             className="h-10"
//                           />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Subject */}
//                   <FormField
//                     className="bg-[#F8FAFC]"
//                     control={form.control}
//                     name="subject"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-[#003057] font-semibold">
//                           Subject
//                         </FormLabel>

//                         <DropdownMenu modal={false}>
//                           {/* Trigger */}
//                           <DropdownMenuTrigger asChild>
//                             <FormControl>
//                               <button
//                                 type="button"
//                                 className="border-input placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm"
//                               >
//                                 <span>{field.value || "Select a subject"}</span>
//                                 <ChevronDown className="h-4 w-4 opacity-50" />
//                               </button>
//                             </FormControl>
//                           </DropdownMenuTrigger>

//                           {/* Content */}
//                           <DropdownMenuContent
//                             align="start"
//                             sideOffset={5}
//                             className="w-[var(--radix-dropdown-menu-trigger-width)]"
//                           >
//                             <DropdownMenuItem
//                               onClick={() => field.onChange("Web Development")}
//                             >
//                               Web Development
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onClick={() => field.onChange("UI/UX Design")}
//                             >
//                               UI/UX Design
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onClick={() => field.onChange("SEO Service")}
//                             >
//                               SEO Service
//                             </DropdownMenuItem>

//                             <DropdownMenuItem
//                               onClick={() => field.onChange("Business Inquiry")}
//                             >
//                               Business Inquiry
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 {/* Message */}
//                 <FormField
//                   control={form.control}
//                   name="message"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-[#003057] font-semibold">
//                         Message
//                       </FormLabel>

//                       <FormControl>
//                         <Textarea
//                           rows={6}
//                           placeholder="Write your message..."
//                           {...field}
//                           className="h-10"
//                         />
//                       </FormControl>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   disabled={form.formState.isSubmitting}
//                   type="submit"
//                   variant="primaryRed"
//                   className="w-full lg:w-3/5 py-6 text-white rounded-2xl font-bold gap-2 hover:shadow-secondary/20 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {form.formState.isSubmitting ? (
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         repeat: Infinity,
//                         duration: 1,
//                         ease: "linear",
//                       }}
//                       className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
//                     />
//                   ) : (
//                     <>
//                       Send Message
//                       <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1        transition-transform" />
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// };

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
