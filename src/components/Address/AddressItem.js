import React from "react";

import CustomInput from "components/CustomInput/CustomInput.js";


function AddressItem(props) {

  return (
    <CustomInput
      labelText={props.labelText}
      id={props.id}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        type: "text",
        autoComplete: "off",
        ...props.inputProps
      }}
    />
  )
}

export default AddressItem;
