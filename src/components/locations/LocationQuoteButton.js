'use client';

import { useState } from 'react';
import RequestQuoteModal from '@/components/RequestQuoteModal';

/** "Request Quote" button that opens the shared quote modal, pre-filled with product/profile. */
export default function LocationQuoteButton({ productName, profileType, label = 'Request Quote', variant = 'solid' }) {
  const [open, setOpen] = useState(false);

  const className =
    variant === 'outline'
      ? 'px-8 py-3 rounded-[16px] font-lato font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1b4b] transition-all duration-300'
      : 'px-8 py-3.5 rounded-[16px] text-white font-lato font-semibold bg-[#C83C64] hover:bg-[#a62f50] hover:shadow-lg transition-all duration-300';

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      <RequestQuoteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        productName={productName}
        profileType={profileType}
      />
    </>
  );
}
