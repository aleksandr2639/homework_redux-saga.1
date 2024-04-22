import { useSelector, useDispatch } from "react-redux";
import { changeSearchField } from "../reducer/skill";

export default function Container() {
  const { items, loading, error, search } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(changeSearchField({ search: value }));
  };
  const hasQuery = search.trim() !== "";

  return (
    <div className="item">
      <div>
        <input className="item__input" value={search} onChange={handleSearch} />
      </div>
      {!hasQuery && <p>Type something to search</p>}
      {hasQuery && loading && <p>searching...</p>}
      {error ? (
          <div>Error occurred</div>
      ) : (
          <ul>
            {items.map((o) => (
                <li key={o.id}>{o.name}</li>
            ))}
          </ul>
      )}
    </div>
  );
}
