import React, { useState } from 'react';

export default function Disclosure({
  id,
  name,
  indent = true,
  children,
  className,
}) {
  const [expanded, setExpanded] = useState(false);
  const display = expanded ? 'block' : 'none';

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const iconStyle = {
    transform: expanded ? 'rotate(0deg) translate(0, -2px)' : 'rotate(-90deg) translate(0, -2px)',
    color: '#822000',
    forcedColorAdjust: 'auto',
  };

  return (
    <div className={className}>
      <dt>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={toggleExpanded}
          className="button__disclosure"
        >
          <svg width="18" height="16" aria-hidden="true" focusable="false" style={iconStyle}>
            <polygon className="arrow" strokeWidth="0" fillOpacity="0.75" fill="currentColor" points="3,6 15,6 9,14" />
          </svg>
          {name}
        </button>
      </dt>
      <dd style={{ 'margin-inline-start': indent ? 'revert' : '0px' }}>
        <div
          data-testid={id}
          id={id}
          style={{ display }}
        >
          { children }
        </div>
      </dd>
    </div>
  );
}
