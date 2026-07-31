import React from 'react';
import { ElevSparkline } from 'ttc-design-system';

export const Defaut = () => (
  <div style={{ padding: 20, maxWidth: 480 }}>
    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
      Dénivelé · D+ 2400 m
    </div>
    <ElevSparkline />
  </div>
);

export const Couleurs = () => (
  <div style={{ padding: 20, maxWidth: 480 }}>
    <ElevSparkline stroke="var(--fire)" fill="var(--green-tint)" />
  </div>
);
