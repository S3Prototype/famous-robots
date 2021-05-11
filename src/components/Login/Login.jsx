import LoginModal from './LoginModal'
import {Grid} from '@material-ui/core'
import coreStyles from '../../styles/coreStyles'

function Login() {
  const styles = coreStyles()
  

  return (
    <Grid container className={styles.appBackground}>  
          <LoginModal />
    </Grid>
  );
}

export default Login;
