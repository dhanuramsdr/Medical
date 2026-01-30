import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import tablets from './img/istockphoto.jpg';
import serup from './img/herbal-iron-tonic-5.jpg';
import oilment from './img/oilment.jpeg';
import video from './img/medical1.avif'; // assuming this is a gif
import { Row, Col, Container } from 'react-bootstrap';
import logo from './img/medical-logo.jpg'
export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const navigates = useNavigate();
  const navigated = useNavigate();
  
  const navigatesoin = useNavigate();
  const navigatedoin = useNavigate();

  
  const navigatessyrub = useNavigate();
  const navigatedsyrub= useNavigate();
  const navigateBilling= useNavigate();



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleLogout = () => {
    axios
      .post('http://localhost:6050/api/v1/login/logout')
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* Adjust the path and style of the CardMedia for your logo */}
            <CardMedia component="img" image={logo} sx={{ width: 50, height: 50, borderRadius: '50%' }} />
          </IconButton>
          <CardMedia src={logo}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SDR MEDICALS
          </Typography>
           <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
             
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div> 
        </Toolbar>
      </AppBar>

      <Container className="full-height mt-3">
  <Row className="g-3 full-height-row" >
    <Col xs={4} md={6} className="d-flex mb-3 mb-md-0" style={{justifyContent:'space-between'}}>
      <Card    sx={{ width: '100%', border:'solid 3px 	#000080' }}>
        <CardMedia onClick={()=>{navigateBilling('/billsection')}}
          component="img"
          alt="medical video"
          src={video}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Card>
    </Col>
    <Col xs={12} md={4} className=" ml-5 ">
      <Card style={{border:'solid 3px 	#000080'}} sx={{ maxWidth: 600, marginBottom: 3 }}>
        <CardMedia
          component="img"
          alt="tablets"
          height="140"
          image={tablets}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tablets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A variety of tablets to help you maintain good health.
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" style={{border:'solid 3px 	#000080'}} onClick={()=>{navigates('/addtablet')}}>Add tablet </Button>
        <Button size="small" style={{border:'solid 3px 	#000080'}} onClick={()=>{navigated('/tablettlist')}}>Showtablets </Button>

        </CardActions>
      </Card>

      <Card  style={{border:'solid 3px 	#000080'}}sx={{ maxWidth: 600, marginBottom: 3  }}>
        <CardMedia
          component="img"
          alt="serup"
          height="140"
          image={serup}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Syrup
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discover a wide range of herbal serums for various health needs.
          </Typography>
        </CardContent>
        <CardActions>
     
          <Button size="small" style={{border:'solid 3px 	#000080'}} onClick={()=>{navigatessyrub('/addsyrup')}}>Addsyrup</Button>
          <Button size="small" style={{border:'solid 3px 	#000080'}} onClick={()=>{navigatedsyrub('/syruplist')}}>Showsyrup</Button>
        </CardActions>
      </Card>

      <Card style={{border:'solid 3px 	#000080'}} sx={{ maxWidth: 600, marginBottom: 3 }}>
        <CardMedia
          component="img"
          alt="ointment"
          height="140"
          image={oilment}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ointment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose from a variety of ointments for different skin conditions.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"style={{border:'solid 3px 	#000080'}} onClick={()=>{navigatesoin('/addoinment')}}>Addoinment</Button>
          <Button size="small" style={{border:'solid 3px 	#000080'}} onClick={()=>{navigatedoin('/oinmentlist')}}>Showoinment</Button>
        </CardActions>
      </Card>
    </Col>
  </Row>
</Container>

    </>
  );
}
