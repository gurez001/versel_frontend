import React, { useEffect, useState } from "react";
import { ClearError, updatePassword } from "../../../actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/UserConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";
import { Button } from "@material-ui/core";

const PasswordUpdate = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updatePassFun = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updatePasswordBtn = (e) => {
    e.preventDefault();
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      Navigate("/user-dashboard");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, Navigate]);

  return (
    <>
      <MetaData
        title={"Update Password"}
        content={"Update Password"}
        keywords={"Update Password"}
      />
      <section className="section-cont">
        <div style={{maxWidth: '650px', margin: '0px auto'}} id="update-pass" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="my--form">
                <h1 style={{ textAlign: "center", fontSize: 20 }}>
                  Update password
                </h1>
                <form
                  className="form"
                  onSubmit={updatePasswordBtn}
                  action="PUT"
                >
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size">Old password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Old password"
                      id="oldPassword"
                      value={passwords.oldPassword}
                      onChange={updatePassFun}
                    />
                  </div>
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size">New password</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New password"
                      id="newPassword"
                      value={passwords.newPassword}
                      onChange={updatePassFun}
                    />
                  </div>
                  <div className="input-list spacer">
                    <label className="spacer xsm-font-size">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      id="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={updatePassFun}
                    />
                  </div>

                  <div className="input-list spacer ">
                    <Button className="button-success" type="submit" >Update Password</Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PasswordUpdate;
