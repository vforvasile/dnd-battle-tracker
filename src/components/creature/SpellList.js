/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import SpellModal from './SpellModal';

export default function SpellList({
  knownSpells,
}) {
  const [visible, setVisible] = React.useState(false);
  const [spell, setSpell] = React.useState(null);

  const onClose = () => {
    setVisible(false);
    setSpell(null);
  };

  const onOpenSpell = (currentSpell) => {
    setVisible(true);
    setSpell(currentSpell);
  };

  const renderModal = () => {
    if (!spell) return null;
    return (
      <SpellModal
        currentSpell={spell}
        visible={visible}
        onClose={onClose}
      />
    );
  };

  return (
    <>
      {renderModal()}
      {knownSpells.map((item, index) => (
        <span key={item.name}>
          <a onClick={() => onOpenSpell(item)}>
            <span className="spell-text">
              {item.name}
            </span>
          </a>

          {knownSpells.length - index !== 1 && <span>{', '}</span>}
        </span>
      ))}
    </>
  );
}
