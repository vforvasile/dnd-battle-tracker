import { BattleType } from '../components/types/battle';
import FileSystem from '../util/fileSystem';

export function save(state:BattleType) {
  const {
    ariaAnnouncements, errors, createCreatureErrors, ...stateToSave
  } = state;
  const now = new Date(Date.now());
  const dateSuffix = `${now.getDate()}_${now.getMonth()}_${now.getFullYear()}`;
  const timeSuffix = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
  const fileSuffix = `${dateSuffix}_${timeSuffix}`;
  const fileContents = JSON.stringify(stateToSave, null, 2);
  FileSystem.save(`dnd_battle_tracker_${fileSuffix}.json`, 'application/json', fileContents);

  const ariaAnnouncement = 'battle saved';
  const newAriaAnnouncements = state.ariaAnnouncements.concat([ariaAnnouncement]);
  return {
    ...state,
    ariaAnnouncements: newAriaAnnouncements,
  };
}

function jsonParse(value:string) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function versionCompatibility(version:string, loadedVersion:string) {
  const majorVersion = version.split('.')[0];
  const loadedMajorVersion = loadedVersion && loadedVersion.split('.')[0];
  return majorVersion === loadedMajorVersion;
}

export function addError(state:BattleType, errorToAdd: string) {
  const errorExists = state.errors.find((error) => error === errorToAdd);

  if (errorExists) {
    return state.errors;
  }

  return state.errors.concat(errorToAdd);
}

function getLoadState(oldState:BattleType, newState:BattleType, ariaAnnouncement:string, error:string) {
  const {
    battleId,
    battleCreated,
    shareEnabled,
  } = oldState;

  const ariaAnnouncements = oldState.ariaAnnouncements.concat([ariaAnnouncement]);
  const errors = error ? addError(oldState, error) : [];

  return {
    ...newState,
    battleId,
    battleCreated,
    shareEnabled,
    ariaAnnouncements,
    errors,
    createCreatureErrors: {},
  };
}

export async function load(state:BattleType, file:Blob) {
  const fileContents = await FileSystem.load(file) as string;
  const loadedState = jsonParse(fileContents);

  if (!loadedState) {
    return getLoadState(
      state,
      state,
      'failed to load battle',
      `Failed to load battle. The file "${file.name}" was invalid.`,
    );
  }

  const { battleTrackerVersion } = state;
  const { battleTrackerVersion: loadedBattleTrackerVersion } = loadedState;

  const versionsAreCompatible = versionCompatibility(
    battleTrackerVersion,
    loadedBattleTrackerVersion,
  );

  if (!versionsAreCompatible) {
    const loadedVersion = loadedBattleTrackerVersion
      ? `version ${loadedBattleTrackerVersion}`
      : 'a different version';
    const error = `The file "${file.name}" was saved from ${loadedVersion} of the battle tracker and is not compatible with the current version, ${battleTrackerVersion}.`;
    return getLoadState(
      state,
      state,
      'failed to load battle',
      `Failed to load battle. ${error}`,
    );
  }

  return getLoadState(
    state,
    loadedState,
    'battle loaded',
    ''
  );
}

export function isSaveLoadSupported() {
  return FileSystem.isSaveSupported();
}

export function dismissErrors(state:BattleType) {
  return {
    ...state,
    errors: [],
  };
}

export function updateErrors(state:BattleType, errorToAdd:string) {
  const errors = addError(state, errorToAdd);
  return { ...state, errors };
}
