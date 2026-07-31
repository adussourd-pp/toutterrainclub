import React from 'react';
import { HeroWaves } from 'ttc-design-system';

// Décor de hero — positionné en absolu ; on lui donne un cadre relatif large
// (au-dessus du breakpoint 900px où le site le masque) pour le montrer en contexte.
export const SurNuit = () => (
  <div style={{ position: 'relative', width: '100%', height: 240, background: 'var(--night)', color: 'var(--green)', borderRadius: 12, overflow: 'hidden' }}>
    <HeroWaves />
  </div>
);
