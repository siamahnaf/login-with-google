import React from 'react';
import GoogleLogin from "react-google-login";
import axios from "axios";

const index = () => {
  const [message, setMessage] = React.useState("")
  const responseGoogle = (response) => {
    axios.post('http://localhost:3001/graphql', {
      query: `
      mutation googleAuth {
        googleAuth(idToken: "${response.tokenId}") {
          message
          success
        }
      }
      `
    })
      .then(res => {
        if (!res.data.errors) {
          setMessage(res.data.data.googleAuth.message)
        }
      })
  }
  return (
    <div className='main'>
      <div className='sub'>
        <div className='content'>
          Google Login
          <div>
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <h1>
            {message}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default index;