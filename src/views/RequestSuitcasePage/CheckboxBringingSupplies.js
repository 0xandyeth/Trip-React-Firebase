import React from "react";
import classNames from "classnames";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

export default function CheckboxBringingSupplies(props) {
  const [checked, setChecked] = React.useState([]);
  const [supplies, setSupplies] = React.useState([])
  const classes = useStyles();
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  const handleToggle = (value, data) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newSupplies = [...supplies];

    if (currentIndex === -1) {
      newChecked.push(value);
      newSupplies.push(data);
    } else {
      newChecked.splice(currentIndex, 1);
      newSupplies.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setSupplies(newSupplies);
    props.callbackFromParent(newSupplies);
  };

  return (
    <div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(1, "Bandages, gauze antiseptics, examination gloves, gowns, wound-care kits, IV kits, masks")}
              checked={
                checked.indexOf(1) !== -1 ? true : false
              }
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{ label: classes.label }}
          label="Bandages, gauze antiseptics, examination gloves, gowns, wound-care kits, IV kits, masks"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(2, "Eye glasses, optical supplies, hygine products, dental supplies")}
              checked={
                checked.indexOf(2) !== -1 ? true : false
              }
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{ label: classes.label }}
          label="Eye glasses, optical supplies, hygiene products, dental supplies"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(3, "Medical instruments: scalpels, syringes, other medical instruments")}
              checked={
                checked.indexOf(3) !== -1 ? true : false
              }
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{label: classes.label }}
          label="Medical instruments: scalpels, syringes, other medical instruments"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(4, "Anything")}
              checked={
                checked.indexOf(4) !== -1 ? true : false
              }
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{label: classes.label }}
          label="Anything"
        />
      </div>
    </div>
  );
}
