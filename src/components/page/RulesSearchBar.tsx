import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';
import ExternalLink from './ExternalLink';
import RulesSearchIcon from '../icons/RulesSearchIcon';

type Props = {
  rulesSearchOpened: boolean;
  onSearch: () => void;
}

export default function RulesSearchBar({ rulesSearchOpened, onSearch }:Props) {
  const [value, setValue] = useState('');
  const [animateNextEntrance, setAnimateNextEntrance] = useState(false);

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!rulesSearchOpened) {
      setValue('');
      setAnimateNextEntrance(true);
    }
    if (rulesSearchOpened) inputRef?.current?.focus();
  }, [rulesSearchOpened]);

  const encodedSearch = encodeURIComponent(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const formHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      anchorRef?.current?.click();
    }
  };

  const RightControl = (
    <ExternalLink
      url={`https://www.dndbeyond.com/search?q=${encodedSearch}`}
      ariaLabel={`Search ${value} on D&D Beyond`}
      title="D&D Beyond Rules Search"
      anchorRef={anchorRef}
      onClick={onSearch}
    >
      <RulesSearchIcon />
    </ExternalLink>
  );

  const className = 'rules-search-bar';
  const classModifier = animateNextEntrance ? `${className}__entrance-animation` : '';

  return rulesSearchOpened && (
    <aside className="rules-search-bar-wrapper" role="search">
      <div className={`rules-search-bar ${classModifier}`}>
        <Input
          ariaLabel="search rules using D&D Beyond"
          label="Search rules using D&D Beyond"
          rightControls={{ RightControl, rightTitle: '', RightSubmitIcon: null }}
          inputId="dnd-beyond-search"
          value={value}
          handleChange={handleChange}
          formHandler={formHandler}
          inputRef={inputRef}
          customClasses="dnd-beyond-search"
          submitHandler={()=> {}}
        />
      </div>
    </aside>
  );
}
