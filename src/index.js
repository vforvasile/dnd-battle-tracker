import React from 'react';
import ReactDOM from "react-dom/client";
import DungeonMasterAppWrapper from './components/app/DungeonMasterAppWrapper';
import PlayerAppWrapper from './components/app/PlayerAppWrapper';
import ErrorBoundary from './components/error/ErrorBoundary';

function getUrlParameter(name) {
  const cleanName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${cleanName}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function setFeatureFlag(flag) {
  const value = getUrlParameter(flag);
  window[`FLAG_${flag}`] = value === 'true';
}

function RenderPlayerApp({ battleId }) {
  return (
    <ErrorBoundary>
      <PlayerAppWrapper battleId={battleId} />
    </ErrorBoundary>
  );
}

function RenderDmApp() {
  return (
    <ErrorBoundary>
      <DungeonMasterAppWrapper />
    </ErrorBoundary>
  );
}

function registerServiceworker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

const battleId = getUrlParameter('battle');

async function render() {
  registerServiceworker();
  setFeatureFlag('creatureToolbar');

  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(
    <React.StrictMode>
      {battleId ? RenderPlayerApp({ battleId }): RenderDmApp()}
    </React.StrictMode>
  );

}

render();
