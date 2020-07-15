import React from 'react';
import styled from 'styled-components';

function Footer() {
    return (
        <StickyFooter>
            <div className='row'>
                <div className='col-md-12'>
                    <TextContainer className='footer p-3 mt-4 text-light-transp-3'>
                        <span className='font-weight-normal'>© JN</span>
                    </TextContainer>
                </div>
            </div>
        </StickyFooter>
    );
}

export default Footer;

const StickyFooter = styled.footer`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

const TextContainer = styled.footer`
    bottom: 0;
    position: absolute;
`;
