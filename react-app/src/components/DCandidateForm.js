import React, {useEffect, useState} from "react";
import { FormControl, Grid, InputLabel, MenuItem, TextField, withStyles, Select, Button} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";

const styles = theme => ({
    root:{
    '& .MuiTextField-root':{
        margin: theme.spacing(1),
        minWidth: 250,
        }
    },
    FormControl:{
        margin: theme.spacing(1),
        minWidth: 250,
    },
    smMarign:{
        margin: theme.spacing(1)
    }
})

const initialFieldValues={
    fullName:'',
    mobile:'',
    email:'',
    age:'',
    bloodGroup:'',
    address: ''

}

const DCandidateForm = ({classes, ...props}) => {
    
    const validate =()=>{
        let temp={}
        temp.fullname = values.fullName?"":"This field is required."
        temp.moblile = values.moblile?"":"This field is required."
        temp.bloodGroup = values.bloodGroup?"":"This field is required."
        temp.email = (/^$|.+@.+..+/).test(values.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

       return Object.values(temp).every(x=>x=="")
    }
    

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        // if(props.currentId == 0)                                     /// FIXX UPDATE
        props.createDCandidate(values,()=>{window.alert('Inserted.')})
        // else
        // props.updateDCandidate(props.currentId, values, ()=> {window.alert('Updated.')})
        
         resetForm()
    }

    useEffect(()=>{
    if(props.currentId!= 0){
    setValues({
        ...props.dCandidateList.find(x=> x.id==props.currentId)
    })
    setErrors({})
    }
    }, [props.currentId])

    return (
        <div className="titleIndex"> Welcome To React-CRUD>
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <FormControl variant="outlined"
                    className={classes.FormControl}>
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                <MenuItem value="A+">A +ve</MenuItem>
                                <MenuItem value="A-">A -ve</MenuItem>
                                <MenuItem value="B+">B +ve</MenuItem>
                                <MenuItem value="B-">B -ve</MenuItem>
                                <MenuItem value="AB+">AB +ve</MenuItem>
                                <MenuItem value="AB-">AB -ve</MenuItem>
                                <MenuItem value="O+">O +ve</MenuItem>
                                <MenuItem value="O-">O -ve</MenuItem>
                            </Select>
                    </FormControl>
                     
                    
                </Grid>
                <Grid item xs={6}>
                <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMarign}
                        >Submit
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.smMarign}
                        onClick={resetForm}
                        >Reset
                        </Button>
                    </div>

                </Grid>
            </Grid>
        </form>
        </div>
    );
}

const mapStateToProps = state =>({  
    dCandidateList:state.dCandidate.list
})

const mapActionToProps ={
 createDCandidate: actions.create,
 updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles) (DCandidateForm));