import React from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const NavMenu = () => {
    const { keycloak, initialized } = useKeycloak();

    return (
        <header>
            <div className="menu">
                <input type="checkbox" id="toggle" />
                <label id="show-menu" htmlFor='toggle'>
                    <div className="btnMenu" id="btnMenu">
                        <i className="material-icons md-36 toggleBtn menuBtn">menu</i>
                    </div>
                
                    <div className="btnMenu">
                        <Link to="/"><i className="material-icons md-36">home</i></Link>
                    </div>
                    <div className="btnMenu">
                        <Link to="/compare"><i className="material-icons md-36">query_stats</i></Link>
                    </div>
                    <div className="btnMenu">
                        {!keycloak.authenticated && (
                            <i onClick={() => keycloak.login()} className="material-icons md-36">login</i>                  
                        )}

                        {!!keycloak.authenticated && (
                            <i onClick={() => keycloak.logout()} className="material-icons md-36">logout</i>  
                        )}
                    </div>
                </label>
            </div>
        </header>
        );
};

export default NavMenu;