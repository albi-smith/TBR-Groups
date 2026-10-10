'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EnquiryForm from './EnquiryForm';

function EnquiryFormParamsInner() {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject') ?? '';
  const category = searchParams.get('cat') ?? '';
  return <EnquiryForm initialSubject={subject} initialCategory={category} />;
}

export default function EnquiryFormWithParams() {
  return (
    <Suspense fallback={<EnquiryForm />}>
      <EnquiryFormParamsInner />
    </Suspense>
  );
}
