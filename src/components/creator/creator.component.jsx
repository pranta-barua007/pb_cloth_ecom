import React from 'react';

import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/linkedin.svg';
import { ReactComponent as MediumIcon } from '../../assets/medium.svg';

import './creator.styles.scss';

const Creator = () => (
    <div className='creator'>
        <div className="creator-github">
            <a target="_blank" href="https://github.com/pranta-barua007">
                <GithubIcon className="github-icon"/> 
            </a>
            <span className="creator-name"><a target="_blank" href="https://github.com/pranta-barua007">
            Pranta Barua &copy;</a></span>
        </div>
        <div className='creator-info'>
            <a target="_blank" href="https://www.linkedin.com/in/pranta-barua-b1760218a/">
                <LinkedinIcon className="linkedin-icon" />
            </a>
            <MediumIcon className="medium-icon" />
        </div>
    </div>
);

export default Creator;

 