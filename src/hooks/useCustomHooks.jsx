import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// Hook 1: useScrollAnimation — detects when element enters viewport
export function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return { ref, isVisible };
}

// Hook 2: useApiQuote — fetches an inspirational tech quote via Axios API call
export function useApiQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchQuote = async () => {
      try {
        const res = await axios.get(
          'https://api.quotable.io/random?tags=technology,inspirational',
          { signal: controller.signal, timeout: 5000 }
        );
        setQuote({ content: res.data.content, author: res.data.author });
      } catch {
        setQuote({
          content: 'The best way to predict the future is to create it.',
          author: 'Alan Kay'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
    return () => controller.abort();
  }, []);

  return { quote, loading };
}

// Hook 3: useMousePosition — aurora parallax effect
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}