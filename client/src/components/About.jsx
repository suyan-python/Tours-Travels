import React from "react";
import Suyan from "../assets/team/suyan.png";
import bimal from "../assets/team/bimal.png";
import byapak from "../assets/team/bayapak.png";
import rupesh from "../assets/team/rupesh.png";

const team = [
  {
    name: "Suyan Man Amatya",
    role: "Full Stack Developer",
    image: Suyan,
    description:
      "Suyan is a highly skilled full stack developer who architected the overall system, ensuring performance, scalability, and a seamless user experience across our platform.",
  },
  {
    name: "Bimal Thapa",
    role: "API Integration & Backend Logic",
    image: bimal,
    description:
      "Bimal specializes in backend engineering, creating robust API integrations and optimizing data flow between services for maximum reliability and speed.",
  },
  {
    name: "Rupesh Silwal",
    role: "UI/UX Designer",
    image: rupesh,
    description:
      "Rupesh crafts elegant, user-centered interfaces that enhance the travel experience, focusing on intuitive design and clean aesthetics.",
  },
  {
    name: "Byapak Chudali",
    role: "Front End Developer",
    image: byapak,
    description:
      "Byapak translates designs into interactive, responsive front-end components, ensuring fluid functionality across devices and browsers.",
  },
];

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-gray-800 mt-28">
      <h1 className="text-5xl font-bold text-center mb-6 text-primary">
        About Us
      </h1>
      <p className="text-lg text-center text-slate-300 max-w-3xl mx-auto mb-12">
        At our core, we believe in making travel more accessible and meaningful.
        Our platform is designed to help explorers seamlessly plan, discover,
        and book unforgettable experiences—all in one place.
      </p>

      <div className="bg-white border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          The Team Behind the Journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>
              </div>
              <p className="text-sm text-gray-600 px-4 pb-4">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
