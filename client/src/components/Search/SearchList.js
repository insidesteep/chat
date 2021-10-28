import SearchItem from "./SearchItem";
import { Link } from "react-router-dom";

const SearchList = ({ users }) => {
  return users.map((user) => (
    <Link key={user._id} to={`/search/${user._id}`}>
      <SearchItem user={user} />
    </Link>
  ));
};

export default SearchList;
