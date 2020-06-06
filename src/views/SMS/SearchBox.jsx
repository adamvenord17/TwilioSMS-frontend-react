import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";

import './searchbox.css';

const SearchBox = (props) => {
    const { classes } = props;
    return (
        <GridContainer>
            <GridItem md={3}>
                <CustomInput
                    labelText="Phone Number"
                    id="phone_number"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                        value: props.phone_number,
                        onChange: e => props.handleInput('phone_number', e.target.value)
                    }}
                />
            </GridItem>
            <GridItem md={3}>
                <CustomInput
                    labelText="Message"
                    id="message"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                        value: props.message,
                        onChange: e => props.handleInput('message', e.target.value)
                    }}
                />
            </GridItem>
            {
                props.display_user?
                <GridItem md={3}>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel id="label-user">User</InputLabel>
                        <Select
                            labelId="label-user"
                            className={classes.formControl}
                            value={props.user_id}
                            onChange={(e) => props.handleInput('user_id', e.target.value)}
                        >
                            {
                                props.users && props.users.length?
                                props.users.map((user) => (
                                    <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>
                                ))
                                : null
                            }
                        </Select>
                    </FormControl>
                </GridItem>
                :null
            }
            <Button
                color="info"
                className="btn-search"
                onClick={props.onClickSearch}
            >
                SEARCH
            </Button>
            
        </GridContainer>
    )
}

export default withStyles(null)(SearchBox);