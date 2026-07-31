import React from 'react';
import { TtcLogo } from 'ttc-design-system';

export const Tailles = () => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', color: 'var(--ink)', padding: 24 }}>
    <TtcLogo size={32} />
    <TtcLogo size={56} />
    <TtcLogo size={88} />
  </div>
);

export const SurNuit = () => (
  <div style={{ background: 'var(--night)', color: 'var(--green)', padding: 28, borderRadius: 12 }}>
    <TtcLogo size={72} />
  </div>
);
