import React, { useEffect, useState } from 'react'

export const Message = () => {
    const [coords, setCoords] = useState({x:0, y:0})
    useEffect(() => {
        const mouseMove = (e) => {
            const coords = {x: e.x, y:e.y}
            setCoords( coords );
        }

        window.addEventListener('mousemove', mouseMove);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        }
    }, [])

    return (
        <div>
            <h1> Eres genial </h1>
            <p>
                x: {coords.x} y: {coords.y}
            </p>
        </div>
    )
}
