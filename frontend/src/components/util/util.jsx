import React from 'react';

import './util.css'



const Util = ({ saveConfig, clearWorkspace }) => {


    return (
        <div className="util">
            <h2 className="title">Util</h2>
            <button
                type="button"
                className="btn btn-warning buttonClear"
                onClick={clearWorkspace}>
                Clear
            </button>

            <button
                type="button"
                className="btn btn-success buttonSave"
                onClick={saveConfig}>
                Save config
            </button>
        </div>
    )
}

export default Util;