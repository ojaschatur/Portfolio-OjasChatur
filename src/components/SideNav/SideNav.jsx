import React, { useEffect, useState } from 'react';
import './sidenav.css';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'project2', label: 'Project2' },
  { id: 'project3', label: 'Project3' },
  { id: 'contact', label: 'Contact' },
];

const SideNav = () => {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className="sidenav">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`sidenav-dot${active === section.id ? ' active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          title={section.label}
        />
      ))}
    </nav>
  );
};

export default SideNav;