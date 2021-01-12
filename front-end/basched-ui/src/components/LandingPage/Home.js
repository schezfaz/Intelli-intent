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
import banner from '../ey.png';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  const [business, setBusiness] = useState();
  const [tech, setTech] = useState();
  const [entertainment, setEntertainment] = useState();
  const [sport, setSport] = useState();
  const [politics, setPolitics] = useState();


  const [org, setOrg] = useState();

  function handleOrg(event, value){
    console.log(value)
    setOrg(value);
  }

  function handleFilter(){
    var obj = {};
    // obj.val = val;
    obj.query = org;
        fetch("/filterSearch", {
            method:"POST",
            cache: "no-cache",
            headers:{
                "Content-type":"application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Origin': "['*']"
            },
            body:JSON.stringify(obj)
            }
        ).then(response => response.json())
        .then(data => {
          setResEs(data)
          console.log(data)
        }) 

  }


  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);


    function handleCategory (event){
      event.preventDefault();
      console.log("User Query submitted:" +pathValue); 
      fetch("/userQuery", {
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
        console.log(data)
        setBusiness(data.business)
        setTech(data.tech)
        setSport(data.sport)
        setEntertainment(data.entertainment)
        setPolitics(data.politics)
        // console.log(data)
      })   
  }

    function handleSubmit(val) {
        //event.preventDefault();
        console.log("submitted:" +val); 
        if(!business)
          alert("Note: You haven't searched for intent query hence all data will be fetchted for this intent")
          var obj = {};
          obj.val = val;
          obj.query = pathValue;
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
            body:JSON.stringify(obj)
            }
        ).then(response => response.json())
        .then(data => {
          setResEs(data)
          console.log(data)
        })   
    }

  return (
    <React.Fragment>
      {/* <MuiThemeProvider theme={eyTheme}> */}
      <CssBaseline />
      <AppBar color="default" position="relative">
        <Toolbar>
          <img src={banner} alt="Banner" width="40" height="50" />
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
              {/* <Grid container spacing={2} justify="center">
                <img src={banner} alt="Banner" width="400" height="200" />
              </Grid> */}
            </div>
          </Container>
        </div>
        
        <Grid item>
          {/* <MuiThemeProvider theme={eyTheme}> */}
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
                        <SearchIcon onClick={handleCategory}/>
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
          {/* </MuiThemeProvider> */}
          <br/>
        
          <Grid item >
          
                <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleSubmit("business")}>
                  business : {business}
                </Button>&nbsp;&nbsp;

                <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleSubmit("tech")}>
                  tech : {tech}
                </Button>&nbsp;&nbsp;

                <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleSubmit("sport")}>
                  sport : {sport}
                </Button>&nbsp;&nbsp;

                <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleSubmit("entertainment")}>
                  entertainment : {entertainment}
                </Button>&nbsp;&nbsp;

                <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleSubmit("politics")}>
                  politics : {politics}
                </Button>&nbsp;&nbsp;
                

                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                <br/>
              <b><i>*Intent scores for categories will be displayed post search query.</i></b>
            </Typography>
          </Grid>

        <br/>
        <br/>
        <br/> 
        <br/>
        

        </Grid>

        

        <ColoredLine color="black" />
        <br/>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <i>Advanced Search</i>
            </Typography>

        <center>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <Autocomplete
              multiple
              onChange={(event, value) => handleOrg(event, value)}
              id="ORG"
              options={ORG}
              getOptionLabel={(option) => option.title}
              style={{ width: "300px" }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="ORG"
                  placeholder="Organisation"
                />
              )}
            />
          </Grid>
        <Grid item xs={3}>
          <Autocomplete
              multiple
              id="GPE"
              options={GPE}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              style={{ width: "300px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="GPE"
                  placeholder="Conutries, States .."
                />
              )}
            />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
              multiple
              id="PERSON"
              options={PERSON}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              style={{ width: "300px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="PERSON"
                  placeholder="Person"
                />
              )}
            />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            multiple
            id="DEPARTMENT"
            options={DEPARTMENT}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            style={{ width: "300px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="DEPARTMENT"
                placeholder="Department"
              />
            )}
          />
        </Grid>
      </Grid>
    </center>
    <br/>
    <br/>

    <Button variant="contained" style={{backgroundColor:"#ffe600"}} onClick={()=> handleFilter()}>
      Filter now
    </Button>
    
    <br/>
    <ColoredLine color="black" />

    
      <Container className={classes.cardGrid} maxWidth="md">
          
          {/* End hero unit */}
          <Grid container spacing={4}>
            {resEs.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/720x600/?books"
                    title={card['_index']}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {card['_source']['name']}{"\n"}
                     Similarity: {(Math.round(card['_score'] * 100) / 100).toFixed(2)}
                    </Typography>
                    <Typography align="center">
                    {card['_index']}
                    </Typography>
                  </CardContent>
                  <center>
                  <CardActions>
                    
                      <Button 
                        variant="contained"  
                        size="small" 
                        color="primary"
                        onClick={() => {window.open(card['_source']['location'])}}
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
      {/* </MuiThemeProvider> */}
    </React.Fragment>
  );
}

const PERSON = [
  { title: 'chris paterson penalties'},
  { title: 'russell' },
  { title: 'james' },
  { title: 'barack' },
  { title: 'jacob' },
  { title: 'philip' },
  { title: 'adam' },
  { title: 'shaw' },
  { title: 'angel gambino' },
  { title: 'michael' },
  { title: 'gordon brown' },
  { title: 'howard' },
  { title: 'tony blair' },
]

const ORG = [
  { title: 'fox'},
  { title: 'tory' },
  { title: 'bbc' },
  { title: 'the european union' },
  { title: 'bbc news' },
  { title: 'the bobby charlton school' },
  { title: 'deutsche securities' },
]

const GPE = [
  { title: 'japan' },
  { title: 'philippines' },
  { title: 'new york' },
  { title: 'australia' },
  { title: 'us' },
  { title: 'america' },
  { title: 'india' },
  { title: 'chicago' },
]

const DEPARTMENT = [
  { title: 'Audit' },
  { title: 'Taxation' },
  { title: 'IT' },
  { title: 'RISK' },
]

