/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from "react";
import isHotkey from "is-hotkey";
import Switch from "react-switch";
import { hotkeys } from "../../hotkeys/hotkeys";
import CrossIcon from "../icons/CrossIcon";
import MonsterSearcher from "../buttons/MonsterSearcher";
import Input from "./Input";
import D20Icon from "../icons/D20Icon";
import rollDice from "../../util/rollDice";
import DropdownOption from "../creature/toolbar/DropdownOption";
import {
  calculateAbilityModifier,
  getArmorClass,
} from "../../util/characterSheet";
import { getCreatureSpellData } from "../../util/spells";
import { isNumber, objKeys } from "../../util/util";
import {
  ApiCreatureInfo,
  CreatureToAddType,
  CreatureType,
  InitialApiCreatureType,
} from "../types/creature";

const BASE_API_URL = "https://www.dnd5eapi.co";

type Props = {
  createCreatureErrors: { [key: string]: string };
  createCreature: (creature: CreatureToAddType) => void;
};

type StateType = CreatureToAddType & {
  submitted: boolean;
}

function CreateCreatureForm({
  createCreatureErrors,
  createCreature: propsCreateCreature,
}: Props) {
  const initialState = {
    name: "",
    initiative: "",
    healthPoints: "",
    armorClass: 0,
    multiplier: 1,
    submitted: false,
    apiData: undefined,
  };
  const [state, setState] = useState(initialState);

  const [monsterData, setMonsterData] = useState<InitialApiCreatureType[]>([]);

  const [dropdownVisible, setDropdownVisible] = useState(true);

  const [hasSameInitiative, setSameInitiative] = useState(true);

  const nameInput = useRef<HTMLInputElement>(null);

  const hotKeyHandler = (e: KeyboardEvent) => {
    if (isHotkey(hotkeys.createCreature, e)) {
      nameInput?.current?.focus();
    }
  };

  const toggleInitiative = () => {
    setSameInitiative((prevValue) => !prevValue);
  };

  const resetForm = () => {
    setState(initialState);
    setDropdownVisible(true);
    setSameInitiative(true);
    nameInput?.current?.focus();
  };

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/monsters`)
      .then((response) => response.json())
      .then((data) => {
        setDropdownVisible(true);
        setMonsterData(data.results as InitialApiCreatureType[]);
      })
      .catch(() => {
        setDropdownVisible(false);
        setMonsterData([]);
      });
  }, []);

  useEffect(() => {
    nameInput?.current?.focus();
    window.addEventListener("keydown", hotKeyHandler);
    return () => window.removeEventListener("keydown", hotKeyHandler);
  }, []);

  useEffect(() => {
    const errors = objKeys(createCreatureErrors).length > 0;

    const { submitted } = state;
    if (submitted && !errors) {
      resetForm();
    }
  }, [state.submitted, createCreatureErrors]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState((prevState) => {
      const newState = { ...prevState };
      // @ts-ignore
      newState[event.target.name] = event.target.value;
      return newState;
    });
  };

  const createCreature = () => {
    const healthPoints =
      state.healthPoints === "" ? undefined : parseInt(state.healthPoints, 10);

    const armorClass = !isNumber(state.armorClass)? Number(state.armorClass): 0;

    const multiplier = !isNumber(state.multiplier)?  parseInt(state.multiplier, 10): state.multiplier;

    const initiative =
      state.initiative === "" ? undefined : parseInt(state.initiative, 10);

    const creature = {
      ...state,
      healthPoints,
      initiative,
      multiplier,
      armorClass,
      syncMultipleInitiatives: hasSameInitiative,
    };
    // @ts-ignore NOTE: fix this
    propsCreateCreature(creature);
    setState((prevState) => ({ ...prevState, submitted: true }));
  };

  const onPressDice = () => {
    setState((prevState) => ({
      ...prevState,
      initiative: `${rollDice(20)}`,
    }));
  };

  const formHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      createCreature();
    }
  };

  const onSelectMonster = (monster: InitialApiCreatureType) => {
    if (!monster) return;
    fetch(`${BASE_API_URL}${monster.url}`)
      .then((response) => response.json())
      .then((data) => {
        const dexterityModifier = data.dexterity
          ? calculateAbilityModifier(data.dexterity)
          : 0;
        const rolledNumber = rollDice(20);
        const calculatedInitiative = `${rolledNumber + dexterityModifier}`;

        const apiData = data as ApiCreatureInfo;

        const spellData = apiData.special_abilities.find(
          (ability) => ability.name === "Spellcasting",
        );

        const creatureSpellData = spellData?.spellcasting
          ? getCreatureSpellData(spellData.spellcasting)
          : undefined;

        // @ts-ignore
        setState((prevState) => ({
          ...prevState,
          initiative:
            state.initiative.length > 0
              ? state.initiative
              : calculatedInitiative,
          name: monster.name,
          healthPoints: data.hit_points,
          armorClass: getArmorClass(data.armor_class),
          spellData: creatureSpellData,
          apiData: {
            ...apiData,
            spellData: creatureSpellData,
          },
        }));
      })
      .finally(() => {
        setDropdownVisible(false);
      });
  };

  const { name, initiative, healthPoints, multiplier, armorClass } = state;

  const { nameError, initiativeError, healthError, multiplierError } =
    createCreatureErrors;

  const renderToggle = state.multiplier > 1;

  const toggleTitle = hasSameInitiative ? "Same" : "Random";

  const filteredMonsters = monsterData.filter((monster) =>
    monster.name.toLowerCase().includes(name.toLowerCase()),
  );

  return (
    <form className="create-creature-form">
      <Input
        customClasses="create-creature-form--item__text"
        required
        error={
          nameError ? <span className="form--label__error"> *</span> : null
        }
        inputRef={nameInput}
        value={name}
        ariaLabel="create creature form. Name (required)"
        label="Creature Name"
        name="name"
        handleChange={handleChange}
        rightControls={{
          rightEnabled: true,
          RightControl: <MonsterSearcher asButton={false} search={name} />,
          rightTitle: "",
          RightSubmitIcon: null,
        }}
        formHandler={formHandler}
        inputId="create-creature-form-name"
        submitHandler={() => {}}
      />

      {name.length > 1 && filteredMonsters.length > 0 && dropdownVisible && (
        <ul
          style={{
            height: "80px",
            overflowY: "scroll",
          }}
          className="creature-toolbar--notes-dropdown"
          role="listbox"
        >
          {filteredMonsters.map((item) => (
            <div
              className="creature-toolbar--notes-dropdown-group"
              key={item.index}
            >
              <DropdownOption
                className="creature-toolbar--notes-dropdown-item"
                onClick={() => onSelectMonster(item)}
                selected={false}
                text={item.name}
              />
            </div>
          ))}
        </ul>
      )}

      <Input
        customClasses="create-creature-form--item__number create-creature-form--item__tall"
        error={initiativeError}
        integer
        value={initiative}
        ariaLabel="create creature form. Initiative (optional)"
        label="Initiative (optional)"
        name="initiative"
        handleChange={handleChange}
        submitHandler={onPressDice}
        rightControls={{
          rightEnabled: true,
          rightTitle: "Roll Initiative",
          RightSubmitIcon: <D20Icon />,
        }}
        formHandler={formHandler}
        inputId="create-creature-form-initiative"
      />
      <Input
        customClasses="create-creature-form--item__number"
        integer
        error={
          healthError && <span className="form--label__error"> &gt; 0</span>
        }
        value={healthPoints}
        ariaLabel="create creature form. Health points (optional)"
        label="HP (optional)"
        min={1}
        name="healthPoints"
        handleChange={handleChange}
        formHandler={formHandler}
        inputId="create-creature-form-health"
        submitHandler={() => {}}
      />
      <Input
        customClasses="create-creature-form--item__number"
        integer
        value={`${armorClass}`}
        ariaLabel="create creature form. Armor Class (optional)"
        label="Armor Class (AC)"
        min={1}
        name="armorClass"
        handleChange={handleChange}
        formHandler={formHandler}
        inputId="create-creature-form-ac"
        submitHandler={() => {}}
      />
      <div className="create-creature-form--multiplier-wrapper">
        <span className="create-creature-form--multiplier-symbol">x</span>
        <Input
          customClasses="create-creature-form--item__multiplier"
          integer
          required
          min={1}
          max={50}
          error={
            multiplierError && (
              <span className="form--label__error"> 1 - 50</span>
            )
          }
          value={`${multiplier}`}
          ariaLabel="create creature form. Multiplier (required)"
          label="Multiply"
          name="multiplier"
          handleChange={handleChange}
          formHandler={formHandler}
          inputId="create-creature-form-multiplier"
          submitHandler={() => {}}
        />
      </div>
      {renderToggle && (
        <div className="right-toggle">
          <span className="sync-label-text">{toggleTitle} init.</span>

          <Switch
            onChange={toggleInitiative}
            checked={hasSameInitiative}
            className="react-switch"
            onColor="#822000"
            onHandleColor="#EBE1AD"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={14}
            width={44}
            id="material-switch"
          />
        </div>
      )}

      <div className="create-creature-form--item__submit">
        <button
          type="button"
          className="create-creature-form--submit"
          title="Add creature"
          aria-label="Add creature"
          onClick={createCreature}
        >
          <CrossIcon />
        </button>
      </div>
    </form>
  );
}

export default CreateCreatureForm;
