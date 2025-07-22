// src/components/Contact.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Connect this to backend)");
    console.log(form);
  };

  return (
    <>
    <Navbar></Navbar>
      <section className="py-12 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              placeholder="Your Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
