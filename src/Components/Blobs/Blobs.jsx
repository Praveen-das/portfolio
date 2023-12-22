import React from 'react'
import './blobs.css'

export default function Blobs() {
    return (
        <div className='blob_wrapper'>
            <div className='blob' style={{ "--top": "0%", "--left": "50%", "--scale": 1, "--delay": "1s" }} />
            <div className='blob' style={{ "--top": "100vh", "--left": "70%", "--scale": 1.2, "--delay": "2s" }} />
            <div className='blob' style={{ "--top": "200vh", "--left": "50%", "--scale": 1.5,  "--delay": "3s" }} />
            <div className='blob' style={{ "--top": "300vh", "--left": "30%", "--scale": 0.8,  "--delay": "4s" }} />
        </div>
    )
}
