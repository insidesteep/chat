import "./MessageForm.styles.scss";
import voiceIcon from "../../../assets/img/voice-icon.svg";
import attachmentIcon from "../../../assets/img/attachment-icon.svg";
import sendIcon from "../../../assets/img/send-icon.svg";
import uploadIcon from "../../../assets/img/upload-icon.svg";
import ButtonClose from "../../ButtonClose";
import { useEffect, useRef, useState } from "react";
import { getFileExtension, isImage } from "../../../utils";
import { setMessage } from "../../../store/message/message.slice";
import { createMessage } from "../../../store/message/message.thunk";
import { useDispatch, useSelector } from "react-redux";

const UploadComponent = ({ onClose, onChange, files }) => {
  return (
    <div className="message-form__uploads">
      {files.map((file, idx) => (
        <div className="message-form__upload-container" key={idx}>
          <div className="message-form__upload-ext">
            <span className="message-bubble__file-ext">{file.type}</span>
          </div>
          <span className="message-form__upload-header">
            {file.fileName.slice(0, 5) + "..." + file.type}
          </span>
        </div>
      ))}
      <div className="message-form__upload-container">
        <label htmlFor="file">
          <div className="message-form__upload-box">
            <img src={uploadIcon} />
          </div>
          <span className="message-form__upload-header">Add Files</span>
          <input type="file" id="file" onChange={onChange} multiple />
        </label>
      </div>

      <div className="message-form__upload-close">
        <ButtonClose invert type="button" onClick={onClose} />
      </div>
    </div>
  );
};

const MessageForm = ({ to }) => {
  const [showUpload, setShowUplaod] = useState(false);
  const [value, setValue] = useState("");
  const [files, setFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toogleUpload = () => setShowUplaod(!showUpload);

  const closeUpload = () => setShowUplaod(false);

  const handleChange = (e) => setValue(e.target.value);

  const handleSelectImage = (e) => {
    const filesNormalize = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      type: getFileExtension(file),
      size: file.size,
      path: URL.createObjectURL(file),
    }));

    setFiles(filesNormalize);
    setOriginalFiles(e.target.files);
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    const images = [];
    const otheFiles = [];

    files.forEach((file) => {
      if (isImage(file)) {
        images.push(file);
      } else {
        otheFiles.push(file);
      }
    });

    const clearFields = () => {
      setValue("");
      setFiles([]);
    };

    const newMessage = {
      user: {
        id: user._id,
        name: user.name,
        photo: user.avatar,
      },
      data: [
        {
          text: value,
          date: new Date(),
          attachments: {
            images,
            files: otheFiles,
          },
        },
      ],
    };

    dispatch(setMessage(newMessage));
    dispatch(createMessage({ to, body: value, files: originalFiles }));
    clearFields();
    closeUpload();
  };

  useEffect(() => {
    const scrollEl = document.querySelectorAll(".ScrollbarsCustom-Scroller")[1];
    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, []);

  return (
    <>
      <form className="message-form" onSubmit={onSendMessage}>
        <input
          className="message-form__input"
          placeholder="Type a new message..."
          value={value}
          onChange={handleChange}
        />
        <button
          className="message-form__send"
          disabled={!(files.length || value)}
        >
          Send
          <img src={sendIcon} />
        </button>
        <div className="message-form__extra">
          <button
            className="message-form__attachment"
            onClick={toogleUpload}
            type="button"
          >
            <img src={attachmentIcon} />
          </button>
          <button className="message-form__voice">
            <img src={voiceIcon} />
          </button>
        </div>
        {showUpload && (
          <UploadComponent
            onClose={closeUpload}
            onChange={handleSelectImage}
            files={files}
          />
        )}
      </form>
    </>
  );
};

export default MessageForm;
