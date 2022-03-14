import { useState } from 'react';
import { sortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeSortOption } from '../../store/rental/rental';

function SortOptions() {
  const { sortType } = useAppSelector(({RENTAL}) => RENTAL);
  const [sort, setSort] = useState(sortType);

  const [isActive, setIsActive] = useState(false);

  const dispatch = useAppDispatch();

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
                  dispatch(changeSortOption(sortOption));
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
