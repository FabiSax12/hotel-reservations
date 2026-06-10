import type { ReactNode } from "react";
import { PAGE_HEADER_STYLES, STAT_CARD_STYLES } from "./PageHeader.styles";

const Root = ({ children }: { children: ReactNode }) => (
  <div className={PAGE_HEADER_STYLES.card}>
    <div className={PAGE_HEADER_STYLES.layout}>{children}</div>
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <div className={PAGE_HEADER_STYLES.heading}>{children}</div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h1 className={PAGE_HEADER_STYLES.title}>{children}</h1>
);

const TitleHighlight = ({ children }: { children: ReactNode }) => (
  <span className={PAGE_HEADER_STYLES.titleHighlight}>{children}</span>
);

const Description = ({ children }: { children: ReactNode }) => (
  <p className={PAGE_HEADER_STYLES.description}>{children}</p>
);

const DescriptionHighlight = ({ children }: { children: ReactNode }) => (
  <span className={PAGE_HEADER_STYLES.descriptionHighlight}>{children}</span>
);

const Stats = ({ children }: { children: ReactNode }) => (
  <div className={STAT_CARD_STYLES.stats}>{children}</div>
);

interface StatCardProps {
  label?: string;
  value?: number | string;
  note?: string;
}

const StatCard = ({ label, value, note }: StatCardProps) => (
  <div className={STAT_CARD_STYLES.card}>
    {label && <p className={STAT_CARD_STYLES.label}>{label}</p>}
    {value !== undefined && <p className={STAT_CARD_STYLES.value}>{value}</p>}
    {note && <p className={STAT_CARD_STYLES.note}>{note}</p>}
  </div>
);

export const PageHeader = {
  Root,
  Heading,
  Title,
  TitleHighlight,
  Description,
  DescriptionHighlight,
  Stats,
  StatCard,
};
