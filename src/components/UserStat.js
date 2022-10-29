import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
                error: <b>Erreur lors de la recherche.</b>,
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
        const response = await fetch('https://localhost:49153/Community/Get');
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
        /*const response = */
        await fetch('Community/GetUser',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ComName: this.state.prefix })
            })
            .then((response) => response.json())
            .then((data) => { alert('test'); this.setState({ userToAdd: data.comName }); })
            .catch(() => {
                this.setState({ userToAdd: null });
            });
    }
}
