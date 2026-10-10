'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown } from '@phosphor-icons/react/ssr';
import Picture from './Picture';
import {
  CATEGORY_GROUPS,
  GROUP_INTRO,
  HEADER_BG,
  CAPABILITY_TILES_BY_GROUP,
} from '../data/categoryContent';

interface CategoryIntroProps {
  groupId: string;
  onExplore?: (groupId: string) => void;
}

/**
 * Category photo header + "How we help" console, shared by the /services page
 * and the home service section.
 */
export default function CategoryIntro({ groupId, onExplore }: CategoryIntroProps) {
  const router = useRouter();
  const group = CATEGORY_GROUPS.find((g) => g.id === groupId);
  if (!group) return null;
  const intro = GROUP_INTRO[groupId];
  const capabilityTiles = CAPABILITY_TILES_BY_GROUP[groupId];
  if (!intro || !capabilityTiles) return null;

  const handleExplore = () => {
    if (onExplore) {
      onExplore(groupId);
      return;
    }
    // Navigate to the services page and land on this category's service-list
    // first card (same scroll behaviour as the in-page "Browse Services" button).
    router.push(`/services#esh-list-${groupId}`);
  };

  return (
    <>
      <div className="esh-group-head esh-group-head--photo">
        <Picture
          src={HEADER_BG[groupId]?.image}
          webp={HEADER_BG[groupId]?.imageWebp}
          alt=""
          className="esh-group-head-img"
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = '0';
          }}
        />
        <span className="esh-group-head-scrim" aria-hidden="true" />
        <div className="esh-group-head-content">
          <div className="esh-group-eyebrow">{group.eyebrow}</div>
          <h3 className="esh-group-title">{group.title}</h3>
        </div>
      </div>

      <div className="esh-console">
        <div className="esh-console-main">
          <div className="esh-console-label">{intro.label}</div>
          <h4 className="esh-console-title">{intro.title}</h4>
          <p className="esh-console-copy">{intro.copy}</p>
          <button type="button" className="esh-console-link" onClick={handleExplore}>
            Explore Our Services <ArrowDown size={15} />
          </button>
        </div>
        <div className="esh-console-tiles">
          {capabilityTiles.map((tile) => (
            <div className="esh-tile" key={tile.label}>
              <div className="esh-tile-icon">
                <tile.icon size={19} strokeWidth={1.9} />
              </div>
              <div>
                <div className="esh-tile-title">{tile.label}</div>
                <div className="esh-tile-chips">
                  {tile.chips.map((chip) => (
                    <span className="esh-tile-chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}