import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from './AuthService';
import axios from 'axios';

class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'admin',
            password: '123456',
            message: '',
        }
        //this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {"username": this.state.username, "password": this.state.password};
        let _data = '{"username":"'+credentials.username+'","password":"'+credentials.password+'"}';
        /*axios.post( 
            'https://aladinstudio.000webhostapp.com/wp-json/jwt-auth/v1/token',
            _data
          )*/
          axios.post('/wp-json/jwt-auth/v1/token', 
          credentials)
          .then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
          });

        /*
        AuthService.login(credentials).then(res => {
            console.log(res);
            if(res.status === 200){
                console.log("success");
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
                this.props.history.push('/welcome');

            }else {
                console.log("error");
                this.setState({message: res.data.message});
            }
          }, (error) => {
            console.log(error);


        });*/
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React User Application
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm">
                    <Typography variant="h4" style={styles.center}>Login</Typography>
                    <form>
                        <Typography variant="h4" style={styles.notification}>{this.state.message}</Typography>
                        <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>

                        <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>

                        <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
                    </form>
                </Container>
            </React.Fragment>
        )
    }

}

const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}

export default LoginComponent;
