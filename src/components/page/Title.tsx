import React, { useEffect, useState } from "react";
import ExternalLink from "./ExternalLink";

function getErrorSubtitle() {
  return "Something went wrong!";
}

type PlayerProps = {
  loading: boolean;
  battleId: string;
};

type SubTitleProps = {
  error: boolean;
  playerSession: boolean;
  loading: boolean;
  battleId: string;
};

type TitleProps = {
  shareEnabled: boolean;
  battleId: string;
  playerSession: boolean;
  error: boolean;
  loading: boolean;
};

type DungeonMasterProps = {
  battleId: string;
};

function getPlayerSessionTitle({ loading, battleId }: PlayerProps) {
  return loading
    ? `Loading player Session ${battleId} ...`
    : `Player Session ${battleId}`;
}

function DungeonMasterSubTitle({ battleId }: DungeonMasterProps) {
  const [playerLink, setPlayerLink] = useState({ url: '', copied: false });

  useEffect(() => {
    if (battleId) {
      const { href } = window.location;
      const url = `${href}?battle=${battleId}`;
      const copyPlayerLink = async () => {
        try {
          await window.navigator.clipboard.writeText(url);
          setPlayerLink({ url, copied: true });
        } catch {
          setPlayerLink({ url, copied: false });
        }
      };
      copyPlayerLink();
    }
  }, [battleId]);

  const { url, copied } = playerLink;

  if (!battleId || !url) {
    return <>. . .</>;
  }

  return (
    <ExternalLink url={url}>
      Player session
      {` ${battleId}`}
      {copied && " (link copied)"}
    </ExternalLink>
  );
}

function SubTitle({ error, playerSession, loading, battleId }: SubTitleProps) {
  if (error) {
    return <>{getErrorSubtitle()}</>;
  }

  if (playerSession) {
    return <>{getPlayerSessionTitle({ loading, battleId })}</>;
  }

  return <DungeonMasterSubTitle battleId={battleId} />;
}

export default function Title({
  shareEnabled,
  battleId,
  playerSession,
  error,
  loading,
}: TitleProps) {
  const showSubtitle = error || shareEnabled || playerSession;

  const titleClasses = `main-title ${showSubtitle ? "main-title__short" : ""}`;

  return (
    <>
      <h1 className={titleClasses}>
        <ExternalLink url="/">D&D Battle Tracker</ExternalLink>
      </h1>
      {showSubtitle && (
        <h2 className="sub-title">
          <SubTitle
            error={error}
            playerSession={playerSession}
            loading={loading}
            battleId={battleId}
          />
        </h2>
      )}
    </>
  );
}
