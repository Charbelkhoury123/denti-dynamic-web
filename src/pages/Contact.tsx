import { useParams } from 'react-router-dom';
import { useDentistData } from '@/hooks/useDentistData';
import { useState } from 'react';

const Contact = () => {
  const { slug } = useParams();
  const { dentist, loading } = useDentistData(slug);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend or Supabase
    setSubmitted(true);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!dentist) return <div className="p-8">Clinic not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Contact {dentist.business_name}</h1>
      <div className="mb-6">
        <div><b>Address:</b> {dentist.address}</div>
        <div><b>Phone:</b> {dentist.phone}</div>
        {dentist.place_url && (
          <div><b>Map:</b> <a href={dentist.place_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Google Maps</a></div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Send</button>
        {submitted && <div className="text-green-600 mt-2">Thank you for contacting us! We'll get back to you soon.</div>}
      </form>
    </div>
  );
};

export default Contact; 