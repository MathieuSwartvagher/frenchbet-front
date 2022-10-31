import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const UserStat = () => {
    const [prefix, setPrefix ] = useState("");
    const [ suggestion, setSuggestion ] = useState("");
    const [ dictionary, setDictionnary ] = useState([]);
    const [ userToAdd, setUserToAdd ] = useState("");
    const [ nbUser, setNbUser ] = useState(0);

    useEffect(() => {
            async function initDictionnary(){
                await getDictionary();
            }
            initDictionnary();
        }, [userToAdd, suggestion, nbUser]
    );

    const getDictionary = async () => {
        await fetch('https://frenchbet.perseflore.com/Community/Get')
        .then(resp => resp.json())
        .then(data => {
            let a = [];
            for (var i in data) {
                a.push(data[i].comName);
            };
            setDictionnary(a);
        });
    }

    const onChange = (e) => {
        let value = e.target.value;
        setPrefix(value);

        let findWord = getWord(value);
        if (findWord != null) {
            setSuggestion(findWord);
            setUserToAdd(value);
        }
        else {
            setSuggestion(null);
            setUserToAdd(null);
        }
    };

    const getWord = (value) => {
        let find = null;
        dictionary.forEach((x) => {
            if (value.length > 1 && x.match('^' + value)) {
                find = x;
            }
        });
        return find;
    }

    const findUser = async () => {
        await fetch('https://frenchbet.perseflore.com/Community/GetUser',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ComName: prefix })
            })
            .then((response) => response.json())
            .then((data) => {setUserToAdd(data.comName ); })
            .catch((e) => {
                setUserToAdd(null);
            });
    }

    const addUserStat = () => {
        toast.promise(
            findUser(),
            {
                loading: 'Recherche...',
                success: () => {
                    if (userToAdd) {
                        let div = document.querySelector('#userChoice');
                        let divForm = document.querySelector('#userChoiceOne');
                        
                        setNbUser(nbUser+1);

                        if (nbUser < 3) {
                            let divToHide = divForm.nextSibling;
                            let divToAdd = document.createElement("div");

                            divToAdd.classList.add('boxUserChoiceFind');
                            divToAdd.innerHTML = divToHide.innerHTML;

                            divToAdd.append(createTrashElement());

                            divToHide.remove();

                            div.insertBefore(divToAdd, divForm);
                        }
                        else if (nbUser === 3){
                            let divToAdd = document.createElement("div");

                            divToAdd.classList.add('boxUserChoiceFind');
                            divToAdd.append(createTrashElement());

                            divForm.classList.add('hide');
                            divForm.classList.remove('boxUserChoice');

                            div.insertBefore(divToAdd, divForm);
                        }
                    }
                    else {
                        toast('Utilisateur non trouvé !', {
                            icon: '⚠️',
                            duration: 2000,
                        });
                    }
                },
                error: () => {<b>Erreur lors de la recherche.</b>}
            },
            {
                success: {
                    style: {
                        display: 'none',
                    }
                }
            }
        );
    }

    const createTrashElement = () => {
        let a = document.createElement("div");
        a.classList.add('removeUserStat');
        let b = document.createElement("span");
        b.classList.add('material-symbols-outlined');
        b.classList.add('trash');
        b.innerHTML = 'delete';

        a.append(b);
        return a;
    }

    return (
        <div className="choice">
            <div id="userChoice">
                <div className="boxUserChoice" id="userChoiceOne">
                    <div className="App">
                        <input
                            type="text"
                            name="search-bar"
                            className="search-bar"
                            placeholder="Rechercher un utilisateur.."
                            defaultValue={prefix}
                            onChange={(e) => onChange(e)}
                        />
                        <input
                            type="text"
                            name="search-bar"
                            className="search-bar2"
                            defaultValue={suggestion}
                        />
                    </div>
                    <a className="btn icon-btn btn-success" onClick={addUserStat}>
                        <span className="material-symbols-outlined iconAddMargin">
                            add_circle
                        </span>
                        Ajouter
                    </a>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                </div>

                <div className="boxUserChoiceNotAdded">
                </div>
              
                <div className="boxUserChoiceNotAdded">
                </div>
            </div>
        </div>
    );
};

export default UserStat;
/* 
export class UserStat extends Component {
    static displayName = UserStat.name;

    constructor(props) {
        super(props);
        this.state = { prefix: "", suggestion: "", dictionary: [], loading: true, userToAdd: "", nbUser: 0 };  
    }

    async componentDidMount() {
        await this.getDictionary();
    }

    onChange = (e) => {
        let value = e.target.value;
        this.setState({
            prefix: value
        });

        let findWord = this.getWord(value);
        if (findWord != null) {
            this.state.suggestion = findWord;
        }
        else {
            this.state.suggestion = null;
        }
    };

    addUserStat = () => {
        toast.promise(
            this.findUser(),
            {
                loading: 'Recherche...',
                success: () => {
                    if (this.state.userToAdd) {
                        let div = document.querySelector('#userChoice');
                        let divForm = document.querySelector('#userChoiceOne');

                        this.setState({ nbUser: this.state.nbUser + 1, loading: false });

                        if (this.state.nbUser < 3) {
                            let divToHide = divForm.nextSibling;
                            let divToAdd = document.createElement("div");

                            divToAdd.classList.add('boxUserChoiceFind');
                            divToAdd.innerHTML = divToHide.innerHTML;

                            divToAdd.append(this.createTrashElement());

                            divToHide.remove();

                            div.insertBefore(divToAdd, divForm);
                        }
                        else if (this.state.nbUser === 3){
                            let divToAdd = document.createElement("div");

                            divToAdd.classList.add('boxUserChoiceFind');
                            divToAdd.append(this.createTrashElement());

                            divForm.classList.add('hide');
                            divForm.classList.remove('boxUserChoice');

                            div.insertBefore(divToAdd, divForm);
                        }


                    }
                    else {
                        toast('Utilisateur non trouvé !', {
                            icon: '⚠️',
                            duration: 2000,
                        });
                    }
                },
                error: () => {<b>Erreur lors de la recherche.</b>}
            },
            {
                success: {
                    style: {
                        display: 'none',
                    }
                }
            }
        );
    }

    createTrashElement = () => {
        let a = document.createElement("div");
        a.classList.add('removeUserStat');
        let b = document.createElement("span");
        b.classList.add('material-symbols-outlined');
        b.classList.add('trash');
        b.innerHTML = 'delete';

        a.append(b);
        return a;
    }

    render() {
        return (
            <div className="choice">
                <div id="userChoice">
                    <div className="boxUserChoice" id="userChoiceOne">
                        <div className="App">
                            
                                <input
                                    type="text"
                                    name="search-bar"
                                    className="search-bar"
                                    placeholder="Rechercher un utilisateur.."
                                    defaultValue={this.state.prefix}
                                    onChange={(e) => this.onChange(e)}
                                />
                                <input
                                    type="text"
                                    name="search-bar"
                                    className="search-bar2"
                                    defaultValue={this.state.suggestion}
                                />
                        </div>
                        <a className="btn icon-btn btn-success" onClick={this.addUserStat}>
                            <span className="material-symbols-outlined iconAddMargin">
                                add_circle
                            </span>
                            Ajouter
                        </a>
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />
                    </div>

                    <div className="boxUserChoiceNotAdded">

                    </div>
                  
                    <div className="boxUserChoiceNotAdded">
                    </div>
                </div>

            </div>
        );
    }

    async getDictionary() {
        const response = await fetch('https://frenchbet.perseflore.com/Community/Get');
        const data = await response.json();
        let a = [];
        for (var i in data) {
            a.push(data[i].comName);
        };
        this.setState({ dictionary: a, loading: false });
    }

    getWord(value) {
        let find = null;
        this.state.dictionary.forEach((x) => {
            if (value.length > 1 && x.match('^' + value)) {
                find = x;
            }
        });

        return find;
    }

    async findUser() {
        await fetch('https://frenchbet.perseflore.com/Community/GetUser',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ComName: this.state.prefix })
            })
            .then((response) => response.json())
            .then((data) => {alert(data.comName); this.setState({ userToAdd: data.comName }); })
            .catch(() => {
                this.setState({ userToAdd: null });
            });
    }
} */
