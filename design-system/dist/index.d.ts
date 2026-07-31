import * as React from "react";

/** Pictogramme montagne TTC (SVG monochrome, hérite de currentColor). */
export interface TtcLogoProps {
  /** Taille du picto en px (carré). */
  size?: number;
}
export declare const TtcLogo: React.FC<TtcLogoProps>;

/** Signature de marque « tout terrain club » cliquable (lien accueil). */
export interface BrandProps {
  /** Cible du lien (accueil par défaut). */
  to?: string;
}
export declare const Brand: React.FC<BrandProps>;

/** En-tête public : marque + navigation + actions (saison, espace membre). */
export interface HeaderPublicProps {
  /** Libellé de l'onglet actif (surligné dans la nav). */
  active?: string;
}
export declare const HeaderPublic: React.FC<HeaderPublicProps>;

/** Bandeau promo (édition en cours, ville, saison). Sans props. */
export declare const PromoStrip: React.FC;

/** Fond décoratif : lignes d'onde topographiques (hérite de currentColor). */
export declare const HeroWaves: React.FC;

/** Mini-graphe de dénivelé (aire hachurée + tracé). */
export interface ElevSparklineProps {
  /** Couleur du tracé. */
  stroke?: string;
  /** Couleur de remplissage de l'aire. */
  fill?: string;
}
export declare const ElevSparkline: React.FC<ElevSparklineProps>;

/** Carte topographique de substitution avec tracé de parcours. Sans props. */
export declare const MapPlaceholder: React.FC;

/** Annotation manuscrite « → logo + meute » avec flèche. Sans props. */
export declare const HandArrow: React.FC;

/** Bandeau partenaires (grille de cartes cliquables). Sans props. */
export declare const PartnersBand: React.FC;

/** Pied de page public : marque, réseaux, liens club, mentions. Sans props. */
export declare const FooterPublic: React.FC;
