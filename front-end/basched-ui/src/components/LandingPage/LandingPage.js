import React, {useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const eyTheme = createMuiTheme({
    palette: {
      background: {
        default: "#c6fced"
      }
    }
});


export default function Home(){
    const classes = useStyles();

    const [pathValue, setValue] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submitted:" +pathValue); 
        fetch("/crawlDir", {
            method:"POST",
            cache: "no-cache",
            headers:{
                "Content-type":"application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Origin': "['*']"
            },
            body:JSON.stringify(pathValue)
            }
        ).then(response => response.json())
        .then(data => console.log(data));
    }



    return(
    <MuiThemeProvider theme={eyTheme}>
      <CssBaseline />
      
        <TextField 
            id="standard-basic"
            style={{ margin: 40, width: 500}}
            placeholder="Enter URL"
            onChange = {(e) => setValue(e.target.value)} 
            InputProps={{
                endAdornment: (
                <InputAdornment>
                    <IconButton>
                    <SearchIcon onClick={handleSubmit}/>
                    </IconButton>
                </InputAdornment>
                )
            }}
        />
    </MuiThemeProvider>
    );

}