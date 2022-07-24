import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions";
import { useDropzone } from "react-dropzone";
import upload from "../../icons/upload.svg";
import "./Signin.css";

function EditProfile() {
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const { userId, profile, username } = useSelector(
    (state) => state.loginStatus
  );
  const [base64Img, setBase64Img] = useState(profile);
  const [usernameField, setUsernameField] = useState(username);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: imageFile ? true : false,
    accept: ".png, .jpeg, .jpg, .webp",
    maxFiles: 1,
    onDrop: (files) => {
      files.length && handleConversion(files);
    },
  });

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleConversion = async (files) => {
    setImageFile(files[0]);
    const base64 = await convertBase64(files[0]);
    setBase64Img(base64);
  };

  const handleForm = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}username`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: userId,
        username: usernameField,
        profile: base64Img ? base64Img : profile,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.username && user.profile)
          dispatch(
            updateUser({ username: user.username, profile: user.profile })
          );
      });
  };

  return (
    <div className="background">
      <div className=" username-container">
        <form>
          <h1>Edit Profile</h1>
          <input
            onChange={(e) => setUsernameField(e.target.value)}
            value={usernameField}
            type="text"
            placeholder="Username"
          />
          <div className="drag-n-drop">
            <h2>Profile Picture</h2>
            <div {...getRootProps()}>
              <div className={`drop-area ${isDragActive && "drag-active"}`}>
                <input onChange {...getInputProps()} />
                {imageFile ? (
                  <div className="uploaded-file">
                    <img src={base64Img} alt="profile" />
                    <div>{imageFile.name}</div>
                    <button
                      onClick={(e) => {
                        setImageFile("");
                        setBase64Img("");
                      }}
                      className="clear"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <>
                    <img src={upload} alt="upload-icon" />
                    <p>
                      Drag 'n' drop .png file here, or click to select files
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            onClick={(e) => handleForm(e)}
            className="signin-button"
          />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
