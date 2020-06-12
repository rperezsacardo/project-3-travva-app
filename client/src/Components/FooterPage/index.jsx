import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./index.css";

const FooterPage = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 footer white">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Learn More</h5>
            <p>Built with React, Node and Google Places API under the hood.</p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Work with us</h5>
            <ul>
              <li className="list-unstyled">
                <a
                  className="white"
                  href="https://www.linkedin.com/in/michael-gaeta-09175331/"
                  target="noref"
                >
                  Michael Gaeta
                </a>
              </li>
              <li className="list-unstyled">
                <a
                  className="white"
                  href="https://www.linkedin.com/in/ricardosacardo/"
                  target="noref"
                >
                  Ricardo Sacardo
                </a>
              </li>
              <li className="list-unstyled">
                <a
                  className="white"
                  href="https://github.com/rperezsacardo/project-3-travva-app"
                  target="noref"
                >
                  Github Repository
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="http://ironhack.com/">Ironhack.com</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
