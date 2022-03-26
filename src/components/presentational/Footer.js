import React from 'react';

function Footer(props) {
    return (
        <footer className="footer-minimal">
            <div className="container">
                <div className='d-flex flex-row justify-content-center'>
                    <img src={require('./../../assets/img/email-icon.png')} alt="email" />
                </div>
                <p>clubdelectura@gmail.com</p>
                <div className='mt-2'>
                    <a className='mr-3em' href='https://www.instagram.com/' target="_blank"><img src={require('./../../assets/img/instagram-icon.png')} alt="instagram" /></a>
                    <a href='https://www.twitter.com/' target="_blank"><img src={require('./../../assets/img/twitter-icon.png')} alt="twitter" /></a>
                </div>
                <div className='mt-2'>
                    <p><span>&copy;&nbsp;</span><span>&nbsp;</span><span>Club de lectura</span><span>.&nbsp;</span><span>All Rights Reserved.</span><span>&nbsp;</span><a href="#">Privacy Policy</a>.</p>
                </div>
            </div>
        </footer >
    );
}


export default Footer;