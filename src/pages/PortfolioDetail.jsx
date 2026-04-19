import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PortfolioDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const siteData = getData();
    const foundProject = siteData.portfolio?.find(p => p.slug === slug);
    setProject(foundProject);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[2rem] font-bold text-near-black mb-4">
            Project Not Found
          </h1>
          <Link
            to="/portfolio"
            className="inline-block px-6 py-3 bg-near-black text-cream font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-mid-gray"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Image */}
      <section className="px-12 py-16 bg-near-black">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[16/9] bg-dark-gray rounded-lg overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#3d3d3d] flex items-center justify-center">
                <span className="text-white/20 text-[1rem] tracking-[0.2em] uppercase">
                  {project.title}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-12 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-near-black mb-6 leading-[1.1]">
            {project.title}
          </h1>

          {/* Tagline */}
          {project.tagline && (
            <p className="text-[1.4rem] text-accent font-display italic mb-12 leading-[1.4]">
              "{project.tagline}"
            </p>
          )}

          {/* Description */}
          <p className="text-[1.1rem] text-mid-gray font-subheading leading-[1.8] mb-16">
            {project.shortDescription}
          </p>

          {/* Strategy Section */}
          {project.strategyBullets && project.strategyBullets.length > 0 && (
            <div className="bg-cream-dark rounded-lg p-10 mb-16">
              <h2 className="font-display text-[1.8rem] font-bold text-near-black mb-6">
                The WHY Behind the Strategy
              </h2>
              <ul className="space-y-4">
                {project.strategyBullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <span className="text-accent font-display text-[1.2rem] font-bold mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1rem] text-near-black font-subheading leading-[1.7]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center">
            <Link
              to="/portfolio"
              className="inline-block px-8 py-4 bg-transparent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] border-[1.5px] border-near-black transition-all hover:bg-near-black hover:text-white"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PortfolioDetail;
