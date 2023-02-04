import React from 'react';
import {Link} from "react-router-dom";
import CopyrightIcon from '@material-ui/icons/Copyright';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YoutubeIcon from '@material-ui/icons/YouTube';


export default function Footer() {

    const styles = {

        smallIcon: {
            width: 25,
            height: 25,
            marginRight: 5
        },
        footerStyle: {
            backgroundColor: '#00A3B6',
            // position: "relative",
            // left: "0",
            bottom: "0",
            width: '100vw',
        },
        liStyle :{
            display : 'inline',
            marginRight: '20px',

        }
    };

    let year = new Date();

    return (
        <footer style={styles.footerStyle}>
            {/*<div className="footer-links">*/}
            {/*    <Link to="/">Your Account</Link>*/}
            {/*    <Link to="/">Your Orders</Link>*/}
            {/*    <Link to="/">Return Policy</Link>*/}
            {/*    <Link to="/">Cancellation Policy</Link>*/}
            {/*    <Link to="/">Customer Service</Link>*/}
            {/*</div>*/}

            <div>
                <ul >
                    <li style={styles.liStyle} ><a href="#" target="_blank" rel="noreferrer"><GitHubIcon fontSize="large" /></a></li>
                    <li style={styles.liStyle}  ><a href="#" target="_blank" rel="noreferrer"><FacebookIcon fontSize="large"/></a></li>
                    <li style={styles.liStyle}  ><a href="#" target="_blank" rel="noreferrer"><InstagramIcon fontSize="large"/></a></li>
                    <li style={styles.liStyle}  ><a href="#" target="_blank" rel="noreferrer"><YoutubeIcon fontSize="large"/></a></li>
                </ul>
            </div>
            <div className="copyright">
                <CopyrightIcon style={styles.smallIcon}/>
                <p  >{`${year.getFullYear()}, Information Management System`}</p>
            </div>

        </footer>
    )
}
