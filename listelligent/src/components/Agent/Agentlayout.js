import React from 'react';
import Agentheader from './Agentheader';
import Agentfooter from './Agentfooter';

const Agentlayout = ({ children }) => {
    return (
        <>
            <Agentheader />
            <div>{children}</div>
            <Agentfooter />
        </>
    )
}

export default Agentlayout;