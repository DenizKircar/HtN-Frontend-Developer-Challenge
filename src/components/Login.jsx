import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import '../css/login.css'

const USER_DATA = [
  {username: 'Deniz', email: 'denizkrar@gmail.com', password: '12345678'},
];

const Login = forwardRef(({}, ref) => {

  const dialog = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const user_info = USER_DATA.find(e => e.email === email && e.password === password);
      if(user_info) {
        const token = 'loggedin';
        localStorage.setItem('token', token);
        alert("Login successful!");
        window.location.reload();
      } else {
        alert('invalid credentials')
      }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Logout successful!");
        window.location.reload();
    }
    
    const handleCloseModal = (e) => {
      e.preventDefault();
      dialog.current.close()
    }

    useImperativeHandle(ref, () => {
      return {
          openSesame() {
            dialog.current.showModal();
          },
          closeSesame() {
            dialog.current.close();
        }
      };
    })

    return createPortal(
      <dialog className="login_form" ref={dialog}>
      {localStorage.getItem('token') ?
        <div className="form">
          <h2>Are you sure you want to Log Out?</h2>
          <p>You will not be able to see private events, but you will still have access to all of the public content of the website.</p>
          <div className="flex-h center">
            <button onClick={handleCloseModal} className="cancel">Cancel</button>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        :
        <form className="form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex-h center">
            <button onClick={handleCloseModal} className="cancel">Cancel</button>
            <button onClick={handleSubmit}>Log In</button>
          </div>
        </form>
      }
      </dialog>,
      document.getElementById('modal')
    );
});
  


export default Login