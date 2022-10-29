import React from 'react';
import NavMenu from './NavMenu';
import { Container } from 'reactstrap';

const Layout = ({children}) => {
return (
    <div className="main">
        <NavMenu />
        <Container>
            {children}
        </Container>
    </div>
    );
};

export default Layout;