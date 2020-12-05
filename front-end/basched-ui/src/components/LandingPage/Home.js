import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/FolderShared';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import banner from '../BaschedBotBanner.jpg';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const eyTheme = createMuiTheme({
  palette: {
    background: {
      default: "#c6fced"
    }
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Developed by Team BaScheD (Bhavya Schezeen Darshan)
      <br/>
      <Link color="inherit" href="https://material-ui.com/">
        Intelli-intent
      </Link>
      {new Date().getFullYear()}
      
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
    margin: theme.spacing(1),
    width: 600,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  const [pathValue, setValue] = useState('');
  const [resEs, setResEs] = useState([]);

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
        .then(data => {
          setResEs(data)
        })   
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="default" position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Intelli-intent - EY Repository Search
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Intelli-intent
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <i>One Place for all EY Documents</i>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <img src={banner} alt="Banner" width="400" height="200" />
              </Grid>
            </div>
          </Container>
        </div>
        
        <Grid item>
          <MuiThemeProvider theme={eyTheme}>
            <TextField 
                id="standard-basic"
                variant="outlined"
                multiline
                style={{ margin: 40, width: 700}}
                placeholder="EY Repository Search"
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
        </Grid>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {resEs.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={card['_index']}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card['_index']}
                    </Typography>
                    <Typography align="center">
                      {card['_source']['name']}
                    </Typography>
                  </CardContent>
                  <center>
                  <CardActions>
                    
                      <Button 
                        variant="contained"  
                        size="small" 
                        color="primary"
                        onClick={() => {alert(card['_source']['location'])}}
                      >
                          Show File Share-Point Location
                      </Button>
                     
                  </CardActions>
                  </center>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> 
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Team BaScheD
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          EY Repository Search
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}