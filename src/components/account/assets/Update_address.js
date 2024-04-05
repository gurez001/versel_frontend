import { Button } from "@material-ui/core";
import React, { useEffect, useMemo, useState, memo } from "react";
import {
  clearErrors,
  shipping_address_info,
  update_shipping_address_info,
} from "../../../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_SHIPPING_ADDRESS_INFO_RESET } from "../../../constants/OrderConstants";
const Update_address = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, address, success, error } = useSelector(
    (state) => state.address
  );
  const [input_value, set_input_value] = useState({
    name: "",
    phone_no: "",
    country: "India",
    address: "",
    city: "",
    pin_code: "",
    state: "",
  });

  const change_input_handler = (e) => {
    const { name, value } = e.target;
    set_input_value({ ...input_value, [name]: value });
  };

  useMemo(() => {
    if (address) {
      set_input_value({
        name: address && address.fullName,
        phone_no: address && address.phoneNo,
        country: address && address.country,
        address: address && address.address,
        city: address && address.city,
        pin_code: address && address.pinCode,
        state: address && address.state,
      });
    }
  }, [address]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Updated successfully");
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_INFO_RESET });
    }
    dispatch(shipping_address_info());
  }, [dispatch, success, error, alert]);

  const submit_form = (e) => {
    e.preventDefault();
    dispatch(update_shipping_address_info(input_value));
  };

  return (
    <>
      <section className="section-cont updatepage">
        <div className="cont-area-h">
          <div
            style={{ maxWidth: "650px", margin: "0 auto" }}
            className="my--form"
          >
            <h1 style={{ textAlign: "center", fontSize: 20 }}>
              Update addresses
            </h1>
            <form className="form" onSubmit={submit_form}>
              <div className="input-list spacer">
                <label className="spacer xsm-font-size" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="on"
                  id="name-input"
                  name="name"
                  value={input_value.name}
                  onChange={(e) => change_input_handler(e)}
                />
              </div>
              <div style={{ gap: 10 }} className="row">
                <div className="input-list spacer col-md-6">
                  <label className="spacer xsm-font-size" htmlFor="name">
                    Phone no
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    id="name-input"
                    name="phone_no"
                    value={input_value.phone_no}
                    onChange={(e) => change_input_handler(e)}
                  />
                </div>
                <div className="input-list spacer col-md-6">
                  <label className="spacer xsm-font-size" htmlFor="name">
                    country
                  </label>
                  <select
                    name="country"
                    value={input_value.country}
                    onChange={(e) => change_input_handler(e)}
                  >
                    <option value={"None"}>Select one</option>
                    <option selected value={"India"}>
                      India
                    </option>
                    <option value={"Other"}>Other</option>
                  </select>
                </div>
              </div>
              <div className="input-list spacer">
                <label className="spacer xsm-font-size" >
                  Address:
                </label>
                <textarea
                
                  autoComplete="on"
            
                  name="address"
                  value={input_value.address}
                  onChange={(e) => change_input_handler(e)}
                ></textarea>
              </div>
              <div style={{ gap: 10 }} className="row">
                <div className="input-list spacer col-md-6">
                  <label className="spacer xsm-font-size" htmlFor="name">
                    City
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    id="name-input"
                    name="city"
                    value={input_value.city}
                    onChange={(e) => change_input_handler(e)}
                  />
                </div>

                <div className="input-list spacer col-md-6">
                  <label className="spacer xsm-font-size" htmlFor="name">
                    Pin code:
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    id="name-input"
                    name="pin_code"
                    value={input_value.pin_code}
                    onChange={(e) => change_input_handler(e)}
                  />
                </div>
              </div>

              <div className="input-list spacer">
                <label className="spacer xsm-font-size" htmlFor="name">
                  State
                </label>
                <input
                  type="text"
                  autoComplete="on"
                  id="name-input"
                  name="state"
                  value={input_value.state}
                  onChange={(e) => change_input_handler(e)}
                />
              </div>

              <div className="input-list">
                <Button
                  disabled={loading}
                  className="button-success"
                  type="submit"
                >
                  Update Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Update_address);
