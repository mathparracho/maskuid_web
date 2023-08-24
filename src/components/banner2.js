import React, { useEffect, useRef } from 'react';

export default function Banner() {
    const banner = useRef();

    useEffect(() => {
        if (!banner.current.firstChild) {
            const conf = document.createElement('script');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `http${window.location.protocol === 'https:' ? 's' : ''}://www.profitablecreativeformat.com/d87102be90b813dd96169a8937fd7a6e/invoke.js`;
            
            conf.innerHTML = `
                atOptions = {
                    'key': 'd87102be90b813dd96169a8937fd7a6e',
                    'format': 'iframe',
                    'height': 600,
                    'width': 160,
                    'params': {}
                };
            `;

            if (banner.current) {
                banner.current.appendChild(conf);
                banner.current.appendChild(script);
            }
        }
    }, []);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensures the container takes up the full viewport height
    };

    return (
        <div style={containerStyle}>
            <div ref={banner}></div>
        </div>
    );
}
