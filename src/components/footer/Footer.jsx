import React from 'react'
import './footer.css'
import { AiFillGithub, AiFillBehanceCircle, AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {
    return (
        <>
            <footer className="nexus__footer">
                <p>Designed and developed by
                    <span> JOHN DEVSIGNER </span>
                    more about this project in
                    <a className="network-icons" href="https://github.com/j-o-devsigner/Nexus-React-Front" target="_blank" rel="noreferrer"><AiFillGithub className="icon"/></a>
                    <a className="network-icons" href="https://www.behance.net/gallery/164255121/Nexus-Web-Application" target="_blank" rel="noreferrer"><AiFillBehanceCircle className="icon"/></a>
                    <a className="network-icons" href="https://www.linkedin.com/in/john-devsigner/" target="_blank" rel="noreferrer"><AiFillLinkedin className="icon"/></a>
                    </p>

            </footer>
        </>
    )
}

export default Footer