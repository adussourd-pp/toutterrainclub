import React from 'react';
import { HandArrow } from 'ttc-design-system';

// Annotation manuscrite positionnée en absolu ; cadre relatif large pour le contexte.
export const Defaut = () => (
  <div style={{ position: 'relative', width: '100%', height: 160, background: 'var(--paper-2)', borderRadius: 12 }}>
    <HandArrow />
  </div>
);
