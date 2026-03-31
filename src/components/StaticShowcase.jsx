import { useEffect, useState, useRef } from 'react';
import { getData } from '../utils/storage';

function StaticShowcase() {
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);
    setVideos(siteData.videos || []);
  }, []);

  const handlePlayVideo = (video) => {
    setActiveVideo(video);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  if (!data) return null;

  return (
    <>
      <section className="px-12 py-24 bg-cream">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-near-black leading-[1.2] uppercase">
            {data.staticShowcaseHeadline}
          </h2>
          <p className="mt-6 text-mid-gray text-[0.95rem] leading-[1.7] max-w-[560px] mx-auto font-light font-subheading">
            {data.staticShowcaseSubheading}
          </p>
        </div>

        {/* Grid of Videos */}
        <div className="flex justify-center gap-5 mb-12 flex-wrap">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-dark-gray rounded overflow-hidden relative cursor-pointer group transition-transform duration-300 hover:scale-105"
              style={{ width: '350px', height: '460px' }}
              onClick={() => handlePlayVideo(video)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Video Preview with Custom Poster */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                poster={video.thumbnail || undefined}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all">
                  <svg
                    className="w-7 h-7 text-near-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/portfolio"
            className="inline-block px-7 py-3 bg-transparent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] border-[1.5px] border-near-black transition-all hover:bg-near-black hover:text-white cursor-pointer"
          >
            See Our Portfolio
          </a>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
          onClick={handleCloseVideo}
        >
          <button
            onClick={handleCloseVideo}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[1000]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl w-full aspect-[4/5] md:aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo.url}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default StaticShowcase;
