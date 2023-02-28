import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="unclickeable" style={ {zIndex: 99} }>
                <img src="https://i.ibb.co/hMNcNmz/icon-loader.png" className="nexus__success-iconLoader" />
            </div>
        </>
    )
}

export default Loader