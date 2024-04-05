import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  LoadUser,
  updateUserProfile,
} from "../../../actions/UserAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constants/UserConstants";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";
import { server_url } from "../../../utils/Url";
import { Button } from "@material-ui/core";

export const UpdateProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./favicon.ico");
  const [avatar, setAvatar] = useState();

  const profileUpdateHeandle = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      setAvatar(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProfileBtn = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email, avatar ? avatar : avatarPreview));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user && user.avatar ? user.avatar.url : "/icon.png");
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated successfully");
      dispatch(LoadUser());
      Navigate("/user-dashboard");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, Navigate, isUpdated, user]);

  return (
    <>
      <MetaData
        title={"Update Profile"}
        content={"Update Profile"}
        keywords={"Update Profile"}
      />
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <section className="section-cont updatepage">
            <div className="cont-area-h">
              <div
                style={{ maxWidth: "650px", margin: "0 auto" }}
                className="my--form"
              >
                <h1 style={{textAlign:'center',fontSize:20}}>Update Profile</h1>
                <form className="form" onSubmit={updateProfileBtn}>
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="on"
                      id="name-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="on"
                      id="email-singup"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size" htmlFor="avatar">
                      avatar
                    </label>
                    <div className="avatar-input-area row">
                      <div className="input-list-avatar col-md-2">
                        <img
                          src={
                            user && user.avatar && user.avatar.url
                              ? `${server_url()}/${user.avatar.url}`
                              : avatarPreview
                              ? avatarPreview
                              : "/icon.png"
                          }
                          alt="avatar preview"
                        />
                      </div>
                      <input
                      className="col-md-10"
                        type="file"
                        name="avatar"
                        id="avatar"
                        // value={singupValue.avatar}
                        accept="image/"
                        onChange={profileUpdateHeandle}
                      />
                    </div>
                  </div>
                  <div className="input-list">
                    <Button className="button-success" type="submit">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Data not found</p>
      )}
    </>
  );
};
