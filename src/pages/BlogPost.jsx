import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getData } from '../utils/storage';

function BlogPost() {
  const { slug } = useParams();
  const data = getData();
  const post = (data.blog || []).find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-portfolio-cream">
        <Navbar />
        <div className="pt-[200px] text-center px-6">
          <h1 className="font-display font-bold text-[40px] uppercase text-near-black mb-4">
            Post Not Found
          </h1>
          <Link
            to="/blog"
            className="font-display text-blue-dark text-[20px] uppercase hover:underline"
          >
            &larr; Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero / cover */}
      {post.coverImage && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article */}
      <article className="max-w-[800px] mx-auto px-6 pt-[180px] pb-24">
        <Link
          to="/blog"
          className="font-display text-blue-dark text-[16px] uppercase tracking-[0.05em] hover:underline mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        <h1 className="font-display font-bold text-[40px] leading-[1.1] uppercase text-near-black mb-4">
          {post.title}
        </h1>

        <p className="font-subheading font-light text-[16px] text-near-black/60 mb-12">
          {formattedDate}
        </p>

        <div className="font-subheading font-light text-[18px] leading-[1.6] text-near-black whitespace-pre-line">
          {post.body}
        </div>
      </article>

      <Footer />
    </div>
  );
}

export default BlogPost;
