import { useParams } from 'react-router-dom';

function slugToTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Service = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <div>Service not found.</div>;
  return (
    <div style={{ padding: 32 }}>
      <h1>{slugToTitle(slug)}</h1>
      <p>This is the page for <b>{slugToTitle(slug)}</b> service.</p>
    </div>
  );
};

export default Service; 