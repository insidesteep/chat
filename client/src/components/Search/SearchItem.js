import Avatar from "../Avatar";
import Dialog from "../Dialog";

const SearchItem = ({ user }) => {
  return (
    <div className="search__item">
      <Dialog photo={user.avatar} userName={user.name} date={user.createdAt} />
    </div>
  );
};

export default SearchItem;
