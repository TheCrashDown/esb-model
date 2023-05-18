import React from 'react';

import './util.css'



const Util = ({ saveConfig }) => {


    return (
        <div className="util">
            <h2 className="title">Util</h2>
            <button
                type="button"
                className="btn btn-info button"
                onClick={saveConfig}>
                Save config
            </button>
        </div>
    )
}

export default Util;