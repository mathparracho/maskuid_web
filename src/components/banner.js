import React, { useEffect, useRef } from 'react';

export default function Banner() {
    const banner = useRef();

    useEffect(() => {
        if (!banner.current.firstChild) {
            const conf = document.createElement('script');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `http${window.location.protocol === 'https:' ? 's' : ''}://www.profitablecreativeformat.com/230ab6a041c157b07091f3616649851e/invoke.js`;
            
            conf.innerHTML = `
                atOptions = {
                    'key': '230ab6a041c157b07091f3616649851e',
                    'format': 'iframe',
                    'height': 250,
                    'width': 300,
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