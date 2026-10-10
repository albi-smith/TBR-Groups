'use client';

import dynamic from 'next/dynamic';

const BranchMap = dynamic(() => import('./BranchMap'), { ssr: false });

export default function BranchMapWrapper({ branches }: { branches: { name: string; location: string; latitude: string; longitude: string }[] }) {
  return <BranchMap branches={branches} />;
}
