// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Send, MessageSquare, Phone, Mail, Clock, Shield } from 'lucide-react';
// import Navbar from '../components/Navbar';

// const EnquiryPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     subject: '',
//     department: '919952773759', // Default to General Queries
//     message: ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear errors when typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
//     if (!formData.message.trim()) newErrors.message = 'Message is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Get department label
//     const deptLabel = formData.department === '919952773759' ? 'General Queries' : 'Service Details';

//     // Construct beautiful WhatsApp message
//     const waMessage = `*New Enquiry from TBR Groups Website*
//  --------------------------------
//  *Name:* ${formData.name.trim()}
//  *Subject:* ${formData.subject.trim()}
//  *Department:* ${deptLabel}

//  *Message:*
// ${formData.message.trim()}`;

//     const encodedMessage = encodeURIComponent(waMessage);
//     const waUrl = `https://wa.me/${formData.department}?text=${encodedMessage}`;

//     // Redirect to WhatsApp
//     window.open(waUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Navbar showBack={true} title="Enquiry" breadcrumbs={[{ label: 'Home', path: '/' }]} />

//       {/* Main Content Area */}
//       <main style={{ flex: 1, padding: '7.5rem 0 4rem' }}>
//         <div className="container">
//           {/* Back button */}
//           <button
//             onClick={() => navigate('/')}
//             className="navbar-back-btn d-inline-flex align-items-center gap-2 mb-4"
//             style={{ border: '1px solid var(--border-default)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', background: 'none' }}
//           >
//             <ArrowLeft size={16} /> Back to Home
//           </button>

//           <div className="row g-5">
//             {/* Left Side: Premium Info Card */}
//             <div className="col-lg-5" data-aos="fade-right">
//               <div className="section-label">Get in Touch</div>
//               <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
//                 Have Questions? <br />
//                 <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
//                   Send an Enquiry
//                 </span>
//               </h2>
//               <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
//                 Fill out the form and submit to chat directly with our department manager on WhatsApp. We are here to answer your service requests, product enquiries, and partnership proposals.
//               </p>

//               {/* Info checklist */}
//               <div className="d-flex flex-column gap-4">
//                 <div className="d-flex align-items-start gap-3">
//                   <div className="info-icon" style={{ flexShrink: 0, width: '40px', height: '40px', background: 'rgba(27,94,32,0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Phone size={18} />
//                   </div>
//                   <div>
//                     <h5 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Direct Line</h5>
//                     <a href="tel:8300426612" className="text-decoration-none" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 500 }}>
//                       +91 8300426612
//                     </a>
//                   </div>
//                 </div>

//                 <div className="d-flex align-items-start gap-3">
//                   <div className="info-icon" style={{ flexShrink: 0, width: '40px', height: '40px', background: 'rgba(27,94,32,0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Mail size={18} />
//                   </div>
//                   <div>
//                     <h5 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Support Email</h5>
//                     <a href="mailto:tbrinnovativetrades@gmail.com" className="text-decoration-none" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 500 }}>
//                       tbrinnovativetrades@gmail.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="d-flex align-items-start gap-3">
//                   <div className="info-icon" style={{ flexShrink: 0, width: '40px', height: '40px', background: 'rgba(27,94,32,0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Clock size={18} />
//                   </div>
//                   <div>
//                     <h5 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Operating Hours</h5>
//                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
//                       Monday - Saturday: 9:00 AM - 6:00 PM
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Safety notice */}
//               <div className="mt-5 p-3 d-flex align-items-center gap-3" style={{ background: 'rgba(27,94,32,0.03)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-lg)' }}>
//                 <Shield size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
//                 <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
//                   Your submission routes directly to our secure WhatsApp line. No intermediary storage is used, guaranteeing your privacy.
//                 </p>
//               </div>
//             </div>

//             {/* Right Side: Form Card */}
//             <div className="col-lg-7" data-aos="fade-left">
//               <div style={{
//                 background: 'var(--bg-card)',
//                 border: '1px solid var(--border-subtle)',
//                 borderRadius: 'var(--radius-xl)',
//                 padding: '2.5rem',
//                 boxShadow: 'var(--shadow-lg)',
//                 position: 'relative'
//               }}>
//                 <div style={{
//                   position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
//                   background: 'linear-gradient(90deg, var(--primary), var(--accent))',
//                   borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
//                 }} />

//                 <div className="d-flex align-items-center gap-2 mb-4">
//                   <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
//                   <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
//                     Enquiry Details
//                   </h3>
//                 </div>

//                 <form onSubmit={handleSubmit} noValidate>
//                   <div className="row g-4">
//                     {/* Name */}
//                     <div className="col-md-6">
//                       <label htmlFor="enquiry-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
//                         Your Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="enquiry-name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="John Doe"
//                         style={{
//                           width: '100%',
//                           padding: '0.75rem 1rem',
//                           borderRadius: 'var(--radius-md)',
//                           border: errors.name ? '1.5px solid #dc3545' : '1px solid var(--border-strong)',
//                           backgroundColor: 'var(--bg-surface)',
//                           color: 'var(--text-primary)',
//                           outline: 'none',
//                           fontSize: '0.9rem',
//                           transition: 'border-color 0.2s'
//                         }}
//                       />
//                       {errors.name && (
//                         <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
//                           {errors.name}
//                         </span>
//                       )}
//                     </div>
//                     {/* Department Selection */}
//                     <div className="col-12">
//                       <label htmlFor="enquiry-department" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
//                         Department / Query Category
//                       </label>
//                       <select
//                         id="enquiry-department"
//                         name="department"
//                         value={formData.department}
//                         onChange={handleChange}
//                         style={{
//                           width: '100%',
//                           padding: '0.75rem 1.25rem',
//                           borderRadius: 'var(--radius-md)',
//                           border: '1px solid var(--border-strong)',
//                           backgroundColor: 'var(--bg-surface)',
//                           color: 'var(--text-primary)',
//                           outline: 'none',
//                           fontSize: '0.9rem',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         <option value="919487635294">General Queries & Support (+91 94876 35294)</option>
//                         <option value="919487635294">Service details & CSC/E-Seva (+91 94876 35294)</option>
//                       </select>
//                     </div>

//                     {/* Subject */}
//                     <div className="col-12">
//                       <label htmlFor="enquiry-subject" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
//                         Subject *
//                       </label>
//                       <input
//                         type="text"
//                         id="enquiry-subject"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         placeholder="e.g. Inquiring about CSC Government Services"
//                         style={{
//                           width: '100%',
//                           padding: '0.75rem 1rem',
//                           borderRadius: 'var(--radius-md)',
//                           border: errors.subject ? '1.5px solid #dc3545' : '1px solid var(--border-strong)',
//                           backgroundColor: 'var(--bg-surface)',
//                           color: 'var(--text-primary)',
//                           outline: 'none',
//                           fontSize: '0.9rem',
//                           transition: 'border-color 0.2s'
//                         }}
//                       />
//                       {errors.subject && (
//                         <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
//                           {errors.subject}
//                         </span>
//                       )}
//                     </div>

//                     {/* Message */}
//                     <div className="col-12">
//                       <label htmlFor="enquiry-message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
//                         Message *
//                       </label>
//                       <textarea
//                         id="enquiry-message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         placeholder="Type your enquiry message here..."
//                         rows="5"
//                         style={{
//                           width: '100%',
//                           padding: '0.75rem 1rem',
//                           borderRadius: 'var(--radius-md)',
//                           border: errors.message ? '1.5px solid #dc3545' : '1px solid var(--border-strong)',
//                           backgroundColor: 'var(--bg-surface)',
//                           color: 'var(--text-primary)',
//                           outline: 'none',
//                           fontSize: '0.9rem',
//                           resize: 'vertical',
//                           transition: 'border-color 0.2s'
//                         }}
//                       />
//                       {errors.message && (
//                         <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
//                           {errors.message}
//                         </span>
//                       )}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="col-12 mt-4">
//                       <button
//                         type="submit"
//                         className="btn-primary w-100 justify-content-center"
//                         style={{ padding: '1rem' }}
//                       >
//                         Send via WhatsApp <Send size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EnquiryPage;
