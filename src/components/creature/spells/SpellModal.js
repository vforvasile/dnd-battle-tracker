import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Triangle } from 'react-loader-spinner';

import DescriptionHighlight from '../DescriptionHighlight';
import { spellIcon, spellIconBackground, spellModalStyle } from './utils';

const BASE_API_URL = 'https://www.dnd5eapi.co';

export default function SpellModal({
  currentSpell,
  visible,
  onClose,
}) {
  const [loading, setLoading] = React.useState(false);
  const [spellInfo, setSpellInfo] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_API_URL}${currentSpell.url}`, { 'Content-Type': 'application/json' })
      .then((response) => response.json())
      .then((data) => {
        console.log('res', data);
        setSpellInfo(data);
      })
      .catch((error) => {
        setSpellInfo(null);
        console.log('error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentSpell]);

  const renderSpellInfo = () => {
    if (loading) {
      return (
        <div className="spell-modal-loading">
          <Triangle
            height="80"
            width="80"
            color="#822000"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible
          />
        </div>
      );
    }
    if (!loading && !spellInfo) return <p>Spell not found</p>; // add fallback;
    return (
      <div className="spell-modal-box">
        <div className="spell-modal-header">
          <div className={`spell-modal-icon ${spellIconBackground(spellInfo.school.name)}`}>
            {spellIcon(spellInfo.school.name)}
          </div>
          <div className="spell-modal-header-title">
            {spellInfo.name}
          </div>
        </div>
        <div className="spell-modal-body">
          <div className="spell-modal-parent">
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Level
              </div>
              <div>
                {spellInfo.level}
              </div>

            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Casting Time
              </div>
              <div>
                {spellInfo.casting_time}
              </div>

            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Range/Area
              </div>
              <div>
                {spellInfo.range}
              </div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Components
              </div>
              <div>
                {spellInfo.components.map((el, index) => (<span>{`${el}${spellInfo.components.length - index === 1 ? '' : ', '}`}</span>))}
              </div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Duration
              </div>
              <div>
                {spellInfo.duration}
              </div>

            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                School
              </div>
              <div>
                {spellInfo.school?.name}
              </div>

            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Attack/Save
              </div>
              <div>
                {spellInfo.dc?.dc_type?.name ?? 'None'}
              </div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">
                Damage/Effect
              </div>
              <div>
                None
              </div>
            </div>
          </div>
          {/* separator line below */}
          <div className="spell-modal-separator" />
          <div className="spell-modal-description">
            {spellInfo.desc.map((el) => (<p><DescriptionHighlight text={el} /></p>))}
          </div>
          <div className="spell-modal-note">
            {spellInfo.higher_level.map((el) => (<p><DescriptionHighlight text={el} /></p>))}
          </div>
        </div>
      </div>
    );
  };

  console.log('spellInfo', spellInfo);
  return (
    <Modal
      style={spellModalStyle}
      isOpen={visible}
      contentLabel="Minimal Modal Example"
      onRequestClose={onClose}
    >
      {renderSpellInfo()}
    </Modal>
  );
}
