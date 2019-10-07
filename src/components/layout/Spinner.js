import React from 'react';
import spinner from './spinner.gif';

function Spinner() {
    return (
        <div>
            <img
                src={spinner}
                alt='Loading...'
                style={{
                    width: '50px',
                    margin: 'auto',
                    display: 'block',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    right: '50%'
                }}
            />
        </div>
    );
}

export default Spinner;
