import React, { useState } from "react";
import {
  beautifySnakeWord,
  capitalizeWord,
  getAbilityWithSign,
  getArmorClass,
  getModifierSign,
  getProficiencyBonus,
} from "../../util/characterSheet";
import { objKeys } from "../../util/util";
import ExternalLink from "../page/ExternalLink";
import { ApiCreatureInfo } from "../types/creature";
import DescriptionHighlight from "./DescriptionHighlight";
import SpellStat from "./spells/SpellStat";

const SAVING_THROW_CUT = "Saving Throw:";
const SKILL_CUT = "Skill:";

type Props = {
  creatureData: ApiCreatureInfo;
  active: boolean;
};

export default function CreatureStats({ creatureData, active }: Props) {
  const [showCreatureStats, setCreatureStats] = useState(active);

  const savingThrows = creatureData.proficiencies
    ? creatureData.proficiencies.filter((ability) =>
        ability.proficiency?.index.includes("saving-throw"),
      )
    : [];
  const skills = creatureData.proficiencies
    ? creatureData.proficiencies.filter((ability) =>
        ability.proficiency?.index.includes("skill"),
      )
    : [];

  const toggleCreatureStats = () => {
    setCreatureStats((prevValue) => !prevValue);
  };

  if (!showCreatureStats) {
    return (
      <div className="creature-title-header">
        <button
          id="close-creature-stats"
          type="button"
          onClick={toggleCreatureStats}
        >
          ▼ Show stats
        </button>
      </div>
    );
  }

  return (
    <div className="stat-block wide">
      <div className="section-left">
        <div className="creature-heading">
          <div className="creature-title-header">
            <h1 id="creature-header-text">{creatureData.name}</h1>
            <button
              id="close-creature-stats"
              type="button"
              onClick={toggleCreatureStats}
            >
              ▲ Hide stats
            </button>
          </div>

          <h2>
            {creatureData.size} {creatureData.type}, {creatureData.alignment}
          </h2>
        </div>
        <svg height="5" width="100%" className="tapered-rule">
          <polyline points="0,0 400,2.5 0,5" />
        </svg>
        <div className="top-stats">
          {creatureData.armor_class && (
            <div className="property-line first">
              <h4>Armor Class - </h4>
              <p>{getArmorClass(creatureData.armor_class)}</p>
            </div>
          )}
          <div className="property-line">
            <h4>Hit Points - </h4>
            <p>
              {creatureData.hit_points} ({creatureData.hit_dice})
            </p>
          </div>
          {creatureData.speed && (
            <div className="property-line last">
              <h4>Speed: </h4>
              {objKeys(creatureData.speed).map((key) => (
                <p key={key}>
                  {" "}
                  {capitalizeWord(key)}
                  {creatureData.speed[key] &&
                    typeof creatureData.speed[key] === "string" && (
                      <>
                        {": "}
                        {creatureData.speed[key]}
                        {", "}
                      </>
                    )}
                </p>
              ))}
            </div>
          )}
          <svg height="5" width="100%" className="tapered-rule">
            <polyline points="0,0 400,2.5 0,5" />
          </svg>
          <div className="abilities">
            <div className="ability-strength">
              <h4>STR</h4>
              <p>{`${creatureData.strength}  ${getAbilityWithSign(
                creatureData.strength,
              )}`}</p>
            </div>
            <div className="ability-dexterity">
              <h4>DEX</h4>
              <p>{`${creatureData.dexterity}  ${getAbilityWithSign(
                creatureData.dexterity,
              )}`}</p>
            </div>
            <div className="ability-constitution">
              <h4>CON</h4>
              <p>{`${creatureData.constitution}  ${getAbilityWithSign(
                creatureData.constitution,
              )}`}</p>
            </div>
            <div className="ability-intelligence">
              <h4>INT</h4>
              <p>{`${creatureData.intelligence}  ${getAbilityWithSign(
                creatureData.intelligence,
              )}`}</p>
            </div>
            <div className="ability-wisdom">
              <h4>WIS</h4>
              <p>{`${creatureData.wisdom}  ${getAbilityWithSign(
                creatureData.wisdom,
              )}`}</p>
            </div>
            <div className="ability-charisma">
              <h4>CHA</h4>
              <p>{`${creatureData.charisma}  ${getAbilityWithSign(
                creatureData.charisma,
              )}`}</p>
            </div>
          </div>
          <svg height="5" width="100%" className="tapered-rule">
            <polyline points="0,0 400,2.5 0,5" />
          </svg>
          {creatureData.damage_immunities?.length > 0 && (
            <div className="property-line first">
              <h4>Damage Immunities: </h4>
              {creatureData.damage_immunities.map((name) => (
                <p key={name}>{capitalizeWord(name)}, </p>
              ))}
            </div>
          )}
          {creatureData.damage_resistances?.length > 0 && (
            <div className="property-line first">
              <h4>Damage Resistances: </h4>
              {creatureData.damage_resistances.map((name) => (
                <p key={name}>{capitalizeWord(name)}, </p>
              ))}
            </div>
          )}

          {creatureData.condition_immunities?.length > 0 && (
            <div className="property-line first">
              <h4>Condition Immunities: </h4>
              {creatureData.condition_immunities.map((data) => (
                <ExternalLink
                  key={data.index}
                  url={`https://www.dndbeyond.com/sources/basic-rules/appendix-a-conditions#${data.name}`}
                  className=""
                  title=""
                  ariaLabel=""
                  anchorRef=""
                  onClick={() => {}}
                >
                  <p>{data.name}, </p>
                </ExternalLink>
              ))}
            </div>
          )}
          {creatureData.damage_vulnerabilities?.length > 0 && (
            <div className="property-line first">
              <h4>Damage Vulnerabilities: </h4>
              {creatureData.damage_vulnerabilities.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          )}

          {savingThrows.length > 0 && (
            <div className="property-line">
              <h4>Saving Throws: </h4>
              {savingThrows.map((savingThrow) => (
                <p key={savingThrow.proficiency.index}>
                  {" "}
                  {savingThrow.proficiency.name.replace(SAVING_THROW_CUT, "")}
                  {": "}
                  {getModifierSign(savingThrow.value)}
                  {savingThrow.value}
                  {", "}
                </p>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="property-line">
              <h4>Skills: </h4>
              {skills.map((skill) => (
                <p key={skill.proficiency.index}>
                  {" "}
                  {skill.proficiency.name.replace(SKILL_CUT, "")}
                  {": "}
                  {getModifierSign(skill.value)}
                  {skill.value}
                  {", "}
                </p>
              ))}
            </div>
          )}

          {creatureData.senses && (
            <div className="property-line">
              <h4>Senses: </h4>
              {objKeys(creatureData.senses).map((key) => (
                <p key={key}>
                  {" "}
                  {beautifySnakeWord(key)} {creatureData.senses[key]}
                  {", "}
                </p>
              ))}
            </div>
          )}
          {creatureData.languages && (
            <div className="property-line">
              <h4>Languages: </h4>
              <p>{creatureData.languages}</p>
            </div>
          )}
          {creatureData.challenge_rating && (
            <div className="property-line last flexRow">
              <div>
                <h4>Challenge </h4>
                <p>
                  {creatureData.challenge_rating}{" "}
                  {creatureData.xp && (
                    <span>{` (${creatureData.xp} XP) `}</span>
                  )}
                </p>
              </div>
              <div className="proficiency-bonus">
                <h4>Proficiency Bonus </h4>{" "}
                <p>
                  {getModifierSign(creatureData.challenge_rating)}
                  {getProficiencyBonus(creatureData.challenge_rating)}
                </p>
              </div>
            </div>
          )}
        </div>
        <svg height="5" width="100%" className="tapered-rule">
          <polyline points="0,0 400,2.5 0,5" />
        </svg>

        {creatureData.special_abilities?.length > 0 &&
          creatureData.special_abilities.map((ability) => {
            if (ability.name === "Spellcasting") {
              return (
                <SpellStat
                  key={ability.name}
                  description={ability.desc}
                  spellData={creatureData.spellData}
                />
              );
            }
            return (
              <div key={ability.name} className="property-block">
                <h4>{ability.name}. </h4>
                <p>
                  <DescriptionHighlight text={ability.desc} />{" "}
                </p>
              </div>
            );
          })}
      </div>
      <div className="section-right">
        {creatureData.actions?.length > 0 && (
          <div className="actions">
            <h3>Actions</h3>
            {creatureData.actions.map((action) => (
              <div key={action.name} className="property-block">
                <h4>{action.name}. </h4>
                <p>
                  <DescriptionHighlight text={action.desc} />{" "}
                </p>
              </div>
            ))}
          </div>
        )}

        {creatureData.legendary_actions?.length > 0 && (
          <div className="actions">
            <h3>Legendary Actions</h3>
            {creatureData.legendary_actions.map((action) => (
              <div key={action.name} className="property-block">
                <h4>{action.name}. </h4>
                <p>
                  <DescriptionHighlight text={action.desc} />{" "}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
