'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, boolean>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleSections.set(id, entry.isIntersecting);
          
          // Find the first visible section
          for (const sectionId of sectionIds) {
            if (visibleSections.get(sectionId)) {
              setActiveSection(sectionId);
              break;
            }
          }
        },
        {
          rootMargin: `-${offset}px 0px -50% 0px`,
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, offset]);

  return activeSection;
}
