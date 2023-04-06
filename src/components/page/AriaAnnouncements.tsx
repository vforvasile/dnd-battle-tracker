import React from 'react';

type Props = {
  announcements: string;
}

export default function AriaAnnouncements({ announcements }:Props) {
  return (
    <div className="aria-announcements" role="status">
      {announcements}
    </div>
  );
}
