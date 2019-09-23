import React from 'react';
const ServerContext = React.createContext(null);
export const withServer = Component => props => (
    <ServerContext.Consumer>
        {server => <Component server={server} {...props}/>}
    </ServerContext.Consumer>
    );
export default ServerContext