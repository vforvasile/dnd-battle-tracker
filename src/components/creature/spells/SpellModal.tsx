/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import Modal from "react-modal";
import { Triangle } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";

import DescriptionHighlight from "../DescriptionHighlight";
import {
  spellIcon,
  spellIconBackground,
  spellModalStyle,
  spellModalStyleMobile,
  spellModalStyleWeb,
} from "./utils";
import { ApiSpell, KnownSpell } from "./types";

const BASE_API_URL = "https://www.dnd5eapi.co";

type Props = {
  currentSpell: KnownSpell;
  visible: boolean;
  onClose: () => void;
};

export default function SpellModal({ currentSpell, visible, onClose }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [spellInfo, setSpellInfo] = React.useState<ApiSpell | null>(null);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_API_URL}${currentSpell.url}`)
      .then((response) => response.json())
      .then((data: ApiSpell) => {
        setSpellInfo(data);
      })
      .catch((error) => {
        setSpellInfo(null);
        console.log("error", error);
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
            visible
          />
        </div>
      );
    }
    if (!loading && !spellInfo) return <p>Spell not found</p>; // add fallback;
    if (!spellInfo) return null;
    return (
      <div className="spell-modal-box">
        <div className="spell-modal-header">
          <div
            className={`spell-modal-icon ${spellIconBackground(
              spellInfo.school.index,
            )}`}
          >
            {spellIcon(spellInfo.school.index)}
          </div>
          <div className="spell-modal-header-title">{spellInfo.name}</div>
        </div>
        <div className="spell-modal-body">
          <div className="spell-modal-parent">
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Level</div>
              <div>{spellInfo.level}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Casting Time</div>
              <div>{spellInfo.casting_time}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Range/Area</div>
              <div>{spellInfo.range}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Components</div>
              <div>
                {spellInfo.components.map((el, index) => (
                  <span>{`${el}${
                    spellInfo.components.length - index === 1 ? "" : ", "
                  }`}</span>
                ))}
              </div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Duration</div>
              <div>{spellInfo.duration}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">School</div>
              <div>{spellInfo.school?.name}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Attack/Save</div>
              <div>{spellInfo.dc?.dc_type?.name ?? "None"}</div>
            </div>
            <div className="spell-modal-item">
              <div className="spell-modal-item-header">Damage/Effect</div>
              <div>None</div>
            </div>
          </div>
          {/* separator line below */}
          <div className="spell-modal-separator" />
          <div className="spell-modal-description">
            {spellInfo.desc.map((el) => (
              <p>
                <DescriptionHighlight text={el} />
              </p>
            ))}
          </div>
          <div className="spell-modal-note">
            {spellInfo.higher_level.map((el) => (
              <p>
                <DescriptionHighlight text={el} />
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  console.log("spellInfo", spellInfo);
  return (
    <Modal
      style={{
        content: {
          ...spellModalStyle.content,
          ...(isTabletOrMobile
            ? spellModalStyleMobile.content
            : spellModalStyleWeb.content),
        },
      }}
      isOpen={visible}
      contentLabel="Minimal Modal Example"
      onRequestClose={onClose}
      appElement={document.getElementById("app") ?? undefined}
    >
      {renderSpellInfo()}
    </Modal>
  );
}
