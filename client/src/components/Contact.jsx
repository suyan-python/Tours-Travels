import React from "react";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-tight text-slate-300">
        Get in Touch
      </h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 space-y-10">
        <div className="flex items-start gap-6">
          <Mail className="w-8 h-8 text-blue-500 mt-1" />
          <div>
            <p className="text-xl font-semibold text-gray-900">Email</p>
            <a
              href="mailto:tourstravels2025@gmail.com"
              className="text-gray-600 hover:text-blue-600 transition-colors underline underline-offset-4"
            >
              tourstravels2025@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Phone className="w-8 h-8 text-green-500 mt-1" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              Contact Numbers
            </p>
            <ul className="space-y-2">
              {["9843822887", "9863730344", "9840383164", "9862575127"].map(
                (phone, index) => (
                  <li key={index}>
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-600 hover:text-green-600 transition-colors underline underline-offset-4"
                    >
                      📞 {phone}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <p className="text-center text-base text-gray-500 pt-4 italic">
          We’re always happy to assist you with your travel plans. Don’t
          hesitate to contact us!
        </p>
      </div>
    </section>
  );
};

export default Contact;
