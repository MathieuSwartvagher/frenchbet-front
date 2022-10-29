import React from 'react';
import { Link } from 'react-router-dom';

function Compare() {
    return (
        <div className="choice">
            <div id="modChoice">
                <Link to="/com-stat">
                    <div className="boxModChoice">
                        <img src="img/groupe.png" className="imgModChoice" />
                        <h2 className="txtChoice">Communauté</h2>
                        <div className="divIcon">
                            <span className="right"></span>
                        </div>
                    </div>
                </Link>
                <Link to="/user-stat">
                    <div className="boxModChoice" >
                        <img src="img/user.png" className="imgModChoice" />
                        <h2 className="txtChoice">Utilisateur</h2>
                        <div className="divIcon">
                        <span className="right"></span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Compare;