import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div className="pt-5" style={{
        display:'flex',
        minHeight:'100vh',
        flexDirection:'column',

      }}>
        <footer className="text-white text-center text-lg-start bg-dark" style={{flexGrow:1}}>
          {/* Grid container */}
          <div className="container p-4">
            {/*Grid row*/}
            <div className="row mt-4">
              {/*Grid column*/}
              <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">About company</h5>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti.
                </p>
                <p>
                  Blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias.
                </p>
                <div className="mt-4">
                  {/* Facebook */}
                  <Link
                    type="button"
                    className="btn btn-floating btn-light btn-lg"
                  >
                    <i className="fab fa-facebook-f" />
                  </Link>
                  {/* Dribbble */}
                  <Link
                    type="button"
                    className="btn btn-floating btn-light btn-lg"
                  >
                    <i className="fab fa-dribbble" />
                  </Link>
                  {/* Twitter */}
                  <Link
                    type="button"
                    className="btn btn-floating btn-light btn-lg"
                  >
                    <i className="fab fa-twitter" />
                  </Link>
                  {/* Google + */}
                  <Link
                    type="button"
                    className="btn btn-floating btn-light btn-lg"
                  >
                    <i className="fab fa-google-plus-g" />
                  </Link>
                  {/* Linkedin */}
                </div>
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
                <h5 className="text-uppercase mb-4 pb-1">Quick Links</h5>
                <div className="form-outline form-white mb-4">
                  <ul className="ps-0">
                    <li className="nav-item mb-2">
                      <Link to={"/"} className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={"/about"} className="nav-link">
                        About
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={"/contact"} className="nav-link">
                        Contact
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={"/users/auth/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={"/users/auth/register"} className="nav-link">
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="form-outline form-white mb-4 ">
                  <h5>ADDRESS</h5>
                  <ul className="fa-ul ps-0">
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-home" />
                      </span>
                      <span className="ms-2">
                        Hatiyadanga, Dabgram II, Siliguri, 735135
                      </span>
                    </li>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-envelope" />
                      </span>
                      <span className="ms-2">barmansdwell@gmail.com</span>
                    </li>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-phone" />
                      </span>
                      <span className="ms-2">+91 9876543210</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Location</h5>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d891.0745044588747!2d88.46974476958208!3d26.702924698548305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4410070c8dc81%3A0xbdda7825b9533490!2sBarman&#39;s%20Dwell!5e0!3m2!1sen!2sin!4v1722513213527!5m2!1sen!2sin"
                  width="100%"
                  height="90%"
                  style={{border:0}}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {/*Grid column*/}
            </div>
            {/*Grid row*/}
          </div>
          {/* Grid container */}
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright: {" "}
            <Link className="text-white" to={'https://www.linkedin.com/in/subhajit-linkedb05/'} target="_blank">
             Subhajit Barman
            </Link>
          </div>
          {/* Copyright */}
        </footer>
      </div>
      {/* End of .container */}
    </>
  );
};

export default Footer;
