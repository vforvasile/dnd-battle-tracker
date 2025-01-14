import React from "react";
import CreatureExpander from "../buttons/CreatureExpander";
import CreatureLocker from "../buttons/CreatureLocker";
import MonsterSearcher from "../buttons/MonsterSearcher";
import CreatureSharer from "../buttons/CreatureSharer";
import CreatureHitPointsSharer from "../buttons/CreatureHitPointsSharer";
import CreatureSpellCreator from "../buttons/CreatureSpellCreator";
import { CreatureType } from "../types/creature";

function getName(
  expanded: boolean,
  active: boolean,
  name: string,
  multiColumn: boolean,
) {
  const maxLength = 22;
  if ((!expanded && !active) || !multiColumn || name.length < maxLength) {
    return name;
  }

  return `${name.slice(0, maxLength)} ...`;
}

type Props = {
  creature: CreatureType;
  active: boolean;
  playerSession: boolean;
  lockHandler: () => void;
  shareHandler: () => void;
  shareHitPointsHandler: () => void;
  expanded: boolean;
  expandHandler: () => void;
  focused: boolean;
  multiColumn: boolean;
  onToggleCreateSpell: () => void;
};

export default function CreatureHeader({
  creature,
  active,
  playerSession,
  lockHandler,
  shareHandler,
  shareHitPointsHandler,
  expanded,
  expandHandler,
  focused,
  multiColumn,
  onToggleCreateSpell,
}: Props) {
  const { alive, name, hitPointsShared, locked, shared } = creature;
  const expandedOrActive = expanded || active;
  const [toggledCreateSpell, setToggleCreateSpell] = React.useState(false);

  const nameClass = "creature-name";
  const nameModifier = alive ? "" : "collapsed-creature--name__dead";
  const collapsedNameClasses = `${nameClass} ${nameModifier}`;
  const classes = expandedOrActive ? nameClass : collapsedNameClasses;

  const titleClass = "creature-title";
  const titleClasses =
    expandedOrActive && multiColumn
      ? `${titleClass} ${titleClass}__multicolumn`
      : titleClass;
  const controlsClass = "creature-header--controls";
  const controlsClasses =
    expandedOrActive && multiColumn
      ? `${controlsClass} ${controlsClass}__multicolumn`
      : controlsClass;

  const toggleCreateSpell = () => {
    onToggleCreateSpell();
    setToggleCreateSpell((prev) => !prev);
  };

  const creatureExpander = (
    <CreatureExpander
      classes={classes}
      active={active}
      expanded={expanded}
      name={getName(expanded, active, name, multiColumn)}
      expandHandler={expandHandler}
      focused={focused}
    />
  );

  const creatureLocker = !playerSession && (
    <CreatureLocker locked={locked} name={name} lockHandler={lockHandler} />
  );

  const creatureSharer = !playerSession && (
    <CreatureSharer
      shared={shared}
      name={name}
      shareHandler={shareHandler}
      disabled={active && shared}
    />
  );

  const creatureHitPointsSharer = !playerSession && (
    <CreatureHitPointsSharer
      shared={hitPointsShared}
      name={name}
      shareHandler={shareHitPointsHandler}
    />
  );

  const creatureSpellCreator = !playerSession && (
    <CreatureSpellCreator
      toggled={toggledCreateSpell}
      name={name}
      onToggleCreateSpell={toggleCreateSpell}
    />
  );

  const monsterSearcher = !playerSession && <MonsterSearcher search={name} />;

  return (
    <div className={titleClasses}>
      <h2 className="creature-header">{creatureExpander}</h2>
      <div className={controlsClasses}>
        {monsterSearcher}
        {creatureLocker}
        {creatureSharer}
        {creatureHitPointsSharer}
        {creatureSpellCreator}
      </div>
    </div>
  );
}
