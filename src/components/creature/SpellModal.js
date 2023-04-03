import React, { useEffect } from 'react';
import Modal from 'react-modal';

const BASE_API_URL = 'https://www.dnd5eapi.co';

const modalStyle = {
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '65%',
    height: '65%',
    backgroundColor: '#FDF1DC',
    borderRadius: '20px',
    boxShadow: '0px 1px 18px -4px rgba(117,74,50,0.98)',
    '-webkit-box-shadow': '0px 1px 18px -4px rgba(117,74,50,0.98)',
    '-moz-box-shadow': '0px 1px 18px -4px rgba(117,74,50,0.98)',
  },
};

const demoSpell = {
  index: 'command',
  name: 'Command',
  desc: [
    "You speak a one-word command to a creature you can see within range. The target must succeed on a wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn't understand your language, or if your command is directly harmful to it.",
    "Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the GM determines how the target behaves. If the target can't follow your command, the spell ends.",
    '***Approach.*** The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.',
    '***Drop.*** The target drops whatever it is holding and then ends its turn.',
    '***Flee.*** The target spends its turn moving away from you by the fastest available means.',
    '***Grovel.*** The target falls prone and then ends its turn.',
    "***Halt.*** The target doesn't move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air.",
  ],
  higher_level: [
    'When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.',
  ],
  range: '60 feet',
  components: [
    'V',
  ],
  ritual: false,
  duration: '1 round',
  concentration: false,
  casting_time: '1 action',
  level: 1,
  dc: {
    dc_type: {
      index: 'wis',
      name: 'WIS',
      url: '/api/ability-scores/wis',
    },
    dc_success: 'none',
  },
  school: {
    index: 'enchantment',
    name: 'Enchantment',
    url: '/api/magic-schools/enchantment',
  },
  classes: [
    {
      index: 'cleric',
      name: 'Cleric',
      url: '/api/classes/cleric',
    },
    {
      index: 'paladin',
      name: 'Paladin',
      url: '/api/classes/paladin',
    },
  ],
  subclasses: [
    {
      index: 'lore',
      name: 'Lore',
      url: '/api/subclasses/lore',
    },
    {
      index: 'fiend',
      name: 'Fiend',
      url: '/api/subclasses/fiend',
    },
  ],
  url: '/api/spells/command',
};

export default function SpellModal({
  currentSpell,
  visible,
  onClose,
}) {
  const [loading, setLoading] = React.useState(false);
  const [spellInfo, setSpellInfo] = React.useState(demoSpell);

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
    if (loading) return <p>Loading...</p>;
    if (!loading && !spellInfo) return <p>Spell not found</p>; // add fallback;
    return (
      <div className="spell-modal-box">
        <div className="spell-modal-header">
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
                {spellInfo.components.map((el) => (<span>{el}</span>))}
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
            {spellInfo.desc.map((el) => (<p>{el}</p>))}
          </div>
          <div className="spell-modal-note">
            {spellInfo.higher_level.map((el) => (<p>{el}</p>))}
          </div>
        </div>
      </div>
    );
  };

  console.log('spellInfo', spellInfo);
  return (
    <Modal
      style={modalStyle}
      isOpen={visible}
      contentLabel="Minimal Modal Example"
      onRequestClose={onClose}
    >
      {renderSpellInfo()}
    </Modal>
  );
}
