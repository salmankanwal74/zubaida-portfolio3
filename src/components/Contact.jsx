import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useCustomHooks';
import { portfolioData } from '../utils/Data';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().min(5, 'Subject too short').required('Subject is required'),
  message: Yup.string().min(20, 'Message must be at least 20 characters').required('Message is required'),
});

const inputStyle = (theme, hasError) => ({
  width: '100%', background: theme.bgSecondary,
  border: `1.5px solid ${hasError ? theme.magenta : theme.border}`,
  borderRadius: '12px', padding: '14px 16px',
  color: theme.text, fontFamily: 'Inter', fontSize: '0.95rem',
  outline: 'none', transition: 'border-color 0.3s',
  boxSizing: 'border-box'
});

export default function Contact() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Real email bhejne ke liye formspree.io se ID lo aur yeh line uncomment karo:
      // await axios.post('https://formspree.io/f/YOUR_FORM_ID', values);
      setSubmitStatus('success');
      resetForm();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: portfolioData.contact.email, href: `mailto:${portfolioData.contact.email}` },
    { icon: '📱', label: 'Phone', value: portfolioData.contact.phone, href: `tel:${portfolioData.contact.phone}` },
    { icon: '📍', label: 'Location', value: portfolioData.contact.address, href: '#' },
    { icon: '🌐', label: 'Portfolio', value: 'Live Site', href: portfolioData.contact.portfolio },
  ];

  return (
    <section id="contact" style={{ background: theme.bg, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ color: theme.green, fontFamily: 'Space Grotesk', fontWeight: 600, letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            GET IN TOUCH
          </p>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: theme.text }}>
            Let's{' '}
            <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Work Together
            </span>
          </h2>
          <p style={{ color: theme.textMuted, fontFamily: 'Inter', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              Contact Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  whileHover={{ x: 8, backgroundColor: `${theme.cyan}10` }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: theme.bgCard, border: `1px solid ${theme.border}`,
                    borderRadius: '14px', padding: '1rem 1.25rem',
                    textDecoration: 'none', transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{info.icon}</span>
                  <div>
                    <p style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.75rem', marginBottom: '2px' }}>{info.label}</p>
                    <p style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '0.9rem' }}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: '1rem' }}>Hobbies & Interests</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {portfolioData.hobbies.map((h, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: `linear-gradient(135deg, ${theme.cyan}15, ${theme.magenta}15)`,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '20px', padding: '6px 14px',
                      color: theme.text, fontFamily: 'Inter', fontSize: '0.85rem'
                    }}
                  >
                    {h}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Formik
              initialValues={{ name: '', email: '', subject: '', message: '' }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: '20px', padding: '2rem'
                }}>
                  <h3 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    Send Message 💬
                  </h3>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <Field name="name" placeholder="Zubaida Kanwal" style={inputStyle(theme, errors.name && touched.name)} />
                    <ErrorMessage name="name" render={msg => (
                      <p style={{ color: theme.magenta, fontSize: '0.8rem', marginTop: '4px', fontFamily: 'Inter' }}>⚠ {msg}</p>
                    )} />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <Field name="email" type="email" placeholder="your@email.com" style={inputStyle(theme, errors.email && touched.email)} />
                    <ErrorMessage name="email" render={msg => (
                      <p style={{ color: theme.magenta, fontSize: '0.8rem', marginTop: '4px', fontFamily: 'Inter' }}>⚠ {msg}</p>
                    )} />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Subject *
                    </label>
                    <Field name="subject" placeholder="Project collaboration..." style={inputStyle(theme, errors.subject && touched.subject)} />
                    <ErrorMessage name="subject" render={msg => (
                      <p style={{ color: theme.magenta, fontSize: '0.8rem', marginTop: '4px', fontFamily: 'Inter' }}>⚠ {msg}</p>
                    )} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Message *
                    </label>
                    <Field as="textarea" name="message" rows={4} placeholder="Tell me about your project..."
                      style={{ ...inputStyle(theme, errors.message && touched.message), resize: 'vertical', minHeight: '120px' }}
                    />
                    <ErrorMessage name="message" render={msg => (
                      <p style={{ color: theme.magenta, fontSize: '0.8rem', marginTop: '4px', fontFamily: 'Inter' }}>⚠ {msg}</p>
                    )} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: `0 0 30px ${theme.cyan}40` } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%', background: isSubmitting ? theme.textMuted : theme.gradient,
                      border: 'none', borderRadius: '12px', padding: '14px',
                      color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700,
                      fontSize: '1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {isSubmitting ? '⏳ Sending...' : '🚀 Send Message'}
                  </motion.button>

                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          marginTop: '1rem', padding: '12px',
                          borderRadius: '10px', textAlign: 'center',
                          background: submitStatus === 'success' ? `${theme.green}15` : `${theme.magenta}15`,
                          border: `1px solid ${submitStatus === 'success' ? theme.green : theme.magenta}`,
                          color: submitStatus === 'success' ? theme.green : theme.magenta,
                          fontFamily: 'Inter', fontSize: '0.9rem'
                        }}
                      >
                        {submitStatus === 'success' ? '✅ Message sent successfully!' : '❌ Something went wrong. Please try again.'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </div>
    </section>
  );
}