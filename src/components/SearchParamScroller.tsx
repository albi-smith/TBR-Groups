'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface SearchParamScrollerProps {
  paramName: string;
  paramValue: string;
  targetId: string;
}

export default function SearchParamScroller({ paramName, paramValue, targetId }: SearchParamScrollerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get(paramName) === paramValue) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
