import { useEffect, useRef } from "react";
import { LinkedinIcon, GithubIcon, MailIcon } from "lucide-react";

const teamMembers = [
  {
    name: "Nombre 1",
    role: "Co-Fundador",
    description:
      "Experto en desarrollo web y estrategia digital con 5 años de experiencia en e-commerce.",
    photo: "/team/member1.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "miembro1@marumero.com",
    },
  },
  {
    name: "Nombre 2",
    role: "Diseñadora Principal",
    description:
      "Diseñadora UX/UI especializada en moda alternativa y experiencia de usuario emocional.",
    photo: "/team/member2.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "miembro2@marumero.com",
    },
  },
  {
    name: "Nombre 3",
    role: "Producción",
    description:
      "Gestión de cadena de suministro y producción sostenible de textiles de alta calidad.",
    photo: "/team/member3.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "miembro3@marumero.com",
    },
  },
  {
    name: "Nombre 4",
    role: "Marketing",
    description:
      "Especialista en branding alternativo y comunidades digitales para culturas urbanas.",
    photo: "/team/member4.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "miembro4@marumero.com",
    },
  },
];

function AboutUsPage() {
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    memberRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      memberRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-primary h-[70vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero-bg1.svg"
            alt="Nuestro equipo"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent/0 via-background/60 to-background"></div>
        </div>

        <div className="flex relative h-full items-end justify-center">
          <div className="flex flex-col h-fit justify-center text-center text-dark max-w-2xl mb-28 animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-staatliches mb-6">
              Conoce al equipo
            </h2>
            <p className="text-lg md:text-2xl mb-8">
              4 mentes creativas dando vida a Marumero
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={(el) => (memberRefs.current[index] = el)}
                className="group relative text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all opacity-0">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-staatliches mb-2 text-primary">
                  {member.name}
                </h3>
                <p className="text-dark font-semibold mb-4">{member.role}</p>
                <p className="text-dark/80 mb-6 px-4 leading-relaxed">
                  {member.description}
                </p>

                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-dark hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer">
                    <LinkedinIcon className="w-6 h-6" />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-dark hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer">
                    <GithubIcon className="w-6 h-6" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-dark hover:text-primary transition-colors">
                    <MailIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CSS Animations */}
      <style
        jsx
        global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default AboutUsPage;
