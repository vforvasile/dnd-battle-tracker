import React from "react";
import SpellModal from "./SpellModal";
import { KnownSpell } from "./types";

type Props = { knownSpells: KnownSpell[] };

export default function SpellList({ knownSpells }: Props) {
  const [visible, setVisible] = React.useState(false);
  const [spell, setSpell] = React.useState<KnownSpell | null>(null);

  const onClose = () => {
    setVisible(false);
    setSpell(null);
  };

  const onOpenSpell = (currentSpell: KnownSpell) => {
    setVisible(true);
    setSpell(currentSpell);
  };

  const renderModal = () => {
    if (!spell) return null;
    return (
      <SpellModal currentSpell={spell} visible={visible} onClose={onClose} />
    );
  };

  return (
    <>
      {renderModal()}
      {knownSpells.map((item, index) => (
        <span key={item.name}>
          <a className="spell-anchor" onClick={() => onOpenSpell(item)}>
            <span className="spell-text">{item.name}</span>
          </a>

          {knownSpells.length - index !== 1 && <span>{", "}</span>}
        </span>
      ))}
    </>
  );
}
