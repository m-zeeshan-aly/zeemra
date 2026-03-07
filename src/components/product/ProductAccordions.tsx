'use client';

import { useState } from 'react';
import { ProductAccordion } from '@/types/product';
import styles from './ProductDetail.module.css';

interface ProductAccordionsProps {
  accordions: ProductAccordion[];
}

export default function ProductAccordions({
  accordions,
}: ProductAccordionsProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const renderContent = (content: string | string[] | { [key: string]: string }) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    // Content is an object (table-like)
    return (
      <table>
        <tbody>
          {Object.entries(content).map(([key, value], idx) => (
            <tr key={idx}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.accordion}>
      {accordions.map((accordion, idx) => (
        <div
          key={idx}
          className={`${styles.accItem} ${openIndex === idx ? styles.open : ''}`}
        >
          <button
            className={styles.accTrigger}
            onClick={() => toggleAccordion(idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{accordion.title}</span>
            <span className={styles.accIcon}>+</span>
          </button>
          <div className={styles.accBody}>
            <div className={styles.accContent}>
              {renderContent(accordion.content)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
