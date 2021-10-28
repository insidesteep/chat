import {Link} from "react-router-dom"
import Dialog from "../Dialog";
import "./DialogList.styles.scss";

const DialogList = ({ dialogs = [] }) => {
  const id = window.location.pathname.split("/").pop();

  console.log(id);

  return dialogs.map((d) => (
    <div key={d.id} className="dialog-list">
      <Link to={`/dialogs/${d.partnerId}`}>
        <Dialog {...d} active={d.partnerId === id} />
      </Link>
    </div>
  ));
};

export default DialogList;
