import { Scrollbar } from "react-scrollbars-custom";
import Avatar from "../../Avatar";
import Button from "../../Button";
import "./Profile.styles.scss";

import callIcon from "../../../assets/img/call-icon.svg";
import blockIcon from "../../../assets/img/block-icon.svg";
import deleteIcon from "../../../assets/img/delete-icon.svg";
import ButtonClose from "../../ButtonClose";
import { useDispatch } from "react-redux";
import { hideProfileBar } from "../../../store/ui/ui.slice";
import { useSelector } from "react-redux";
import { correctFilePath, isImage } from "../../../utils";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const closeProfile = () => {
    dispatch(hideProfileBar());
  };

  return (
    <div className="profile">
      <div className="profile__container">
        {userProfile && (
          <Scrollbar>
            <div className="profile__contact">
              <h2 className="profile__title">Contact Info</h2>
              <div className="profile__avatar">
                <Avatar
                  image={userProfile.info.avatar}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="profile__name">{userProfile.info.name}</h3>
              <p className="profile__about">Sr. Visual Designer</p>
              <div className="profile__call">
                <Button
                  indicator={userProfile.info.activity}
                  value="Available"
                />
                <Button value="Call" colorName="pink" iconSrc={callIcon} />
              </div>
            </div>
            <hr />
            <div className="profile__media">
              <h2 className="profile__title">Media</h2>
              <div className="profile__files">
                {userProfile.media.slice(0, 8).map((file) =>
                  isImage(file) ? (
                    <div className="profile__file" key={file._id}>
                      <img src={correctFilePath(file.path)} />
                    </div>
                  ) : (
                    <div class="message-form__upload-container profile__file">
                      <div class="message-form__upload-ext">
                        <span class="message-bubble__file-ext">apk</span>
                      </div>
                      <span class="message-form__upload-header">
                        teleg...apk
                      </span>
                    </div>
                  )
                )}
                {userProfile.media.length > 7 && (
                  <div className="profile__file">
                    <span>{userProfile.media.slice(8).length} More</span>&#x0003E;
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="profile__setting">
              <span>Mute Notifications</span>
              <span className="profile__radio">
                <input type="radio" id="radio" />
                <label for="radio"></label>
              </span>
            </div>
            <hr />
            <div className="profile__setting">
              <span>Starred Messages</span>
              <span>&#x0003E;</span>
            </div>
            <hr />
            <button className="profile__button">
              <img src={blockIcon} />
              Block Contact
            </button>
            <button className="profile__button">
              <img src={deleteIcon} />
              Delete Chat
            </button>
          </Scrollbar>
        )}
        <div className="profile__close">
          <ButtonClose onClick={closeProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
