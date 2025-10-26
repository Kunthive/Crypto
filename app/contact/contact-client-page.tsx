"use client"

import type React from "react"
import { useState } from "react"

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "info">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("info")

    // Reset form
    setFormData({ name: "", email: "", message: "" })

    // Show success message
    setTimeout(() => setStatus("success"), 100)
    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <article>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Get In Touch</h1>
        <p className="text-lg text-secondary mb-12">Have questions or feedback? Reach out to me.</p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors text-foreground placeholder-secondary"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email <span className="text-secondary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors text-foreground placeholder-secondary"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message <span className="text-secondary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors text-foreground placeholder-secondary resize-none"
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="p-4 bg-muted border border-border rounded-lg">
              <p className="text-foreground font-medium">
                Thank you for reaching out! EmailJS integration coming soon.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-foreground text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Setup Instructions */}
        <div className="mt-16 p-6 bg-muted border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">EmailJS Integration</h3>
          <p className="text-sm text-secondary mb-4">
            The contact form is ready for EmailJS integration. To enable email sending, you'll need to:
          </p>
          <ol className="text-sm text-secondary space-y-2 list-decimal list-inside">
            <li>Sign up at emailjs.com</li>
            <li>Create an email service (Gmail, Outlook, etc.)</li>
            <li>Create an email template with variables: from_name, user_email, message</li>
            <li>
              Add these environment variables to your Vercel project:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</li>
                <li>NEXT_PUBLIC_EMAILJS_SERVICE_ID</li>
                <li>NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</li>
              </ul>
            </li>
          </ol>
        </div>
      </article>
    </div>
  )
}
