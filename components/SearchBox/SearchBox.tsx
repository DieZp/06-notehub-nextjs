// app/components/SearchBox/SearchBox.tsx

import css from './SearchBox.module.css';

interface SearchBoxProps {
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onChange}
    />
  );
}

export default SearchBox;