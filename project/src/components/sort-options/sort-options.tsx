import { useState } from 'react';
import { sortOptions } from '../../const';

function SortOptions() {
  const [sort, setSort] = useState(sortOptions[0]);
  const [isActive, setIsActive] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsActive(!isActive)}
      >
        {sort}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom${isActive ? ' places__options--opened' : ''}`}
      >
        {
          sortOptions.map((sortOption) => (
            <li
              className={`places__option${sortOption === sort ? ' places__option--active' : ''}`}
              key={sortOption}
              tabIndex={0}
              onClick={
                () => {
                  setSort(sortOption);
                  setIsActive(!isActive);
                }
              }
            >
              {sortOption}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortOptions;
