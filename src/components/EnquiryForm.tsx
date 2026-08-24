'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    department: '919487635294',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waStatus, setWaStatus] = useState<'idle' | 'opening' | 'done'>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitEnquiry = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const deptLabel = formData.department === '919487635294' ? 'General Queries' : 'Service Details';

    const waMessage = `*New Enquiry from TBR Groups Website*
 --------------------------------
 *Name:* ${formData.name.trim()}
 *Subject:* ${formData.subject.trim()}
 *Department:* ${deptLabel}

 *Message:*
 ${formData.message.trim()}`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${formData.department}?text=${encodedMessage}`;

    setWaStatus('opening');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setWaStatus('done');
      setTimeout(() => setWaStatus('idle'), 1800);
    }, 800);
  }, [formData]);

  return (
    <div className="enquiry-form-card">
      <form onSubmit={handleSubmitEnquiry} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="enquiry-name-home" className="enquiry-label">
              Your Name
            </label>
            <input
              type="text"
              id="enquiry-name-home"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`enquiry-input ${errors.name ? 'enquiry-input--error' : ''}`}
            />
            {errors.name && (
              <span className="enquiry-error">{errors.name}</span>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="enquiry-department-home" className="enquiry-label">
              Service Category
            </label>
            <select
              id="enquiry-department-home"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="enquiry-input enquiry-select"
            >
              <option value="919487635294">Tech & Software</option>
              <option value="919487635294">Govt & Finance</option>
              <option value="919487635294">Trading & Retail</option>
              <option value="919487635294">Other</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="enquiry-subject-home" className="enquiry-label">
              Subject
            </label>
            <input
              type="text"
              id="enquiry-subject-home"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Inquiring about CSC Government Services"
              className={`enquiry-input ${errors.subject ? 'enquiry-input--error' : ''}`}
            />
            {errors.subject && (
              <span className="enquiry-error">{errors.subject}</span>
            )}
            </div>

          <div className="col-12">
            <label htmlFor="enquiry-message-home" className="enquiry-label">
              Message
            </label>
            <textarea
              id="enquiry-message-home"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your enquiry message here..."
              rows={3}
              ref={textareaRef}
              onInput={handleTextareaInput}
              className={`enquiry-input enquiry-textarea ${errors.message ? 'enquiry-input--error' : ''}`}
            />
            {errors.message && (
              <span className="enquiry-error">{errors.message}</span>
            )}
          </div>

          <div className="col-12" style={{ marginTop: '0.5rem' }}>
            <button
              type="submit"
              className="enquiry-submit"
              disabled={waStatus !== 'idle'}
            >
              {waStatus === 'idle' && <>Send via WhatsApp <Send size={16} /></>}
              {waStatus === 'opening' && <><Loader2 size={16} className="enquiry-spin" /> Opening WhatsApp...</>}
              {waStatus === 'done' && <><CheckCircle2 size={16} /> Redirected ✓</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
