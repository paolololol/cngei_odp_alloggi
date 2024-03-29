import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

const data = require('./data.json');

function App() {
    const { keycloak, initialized } = useKeycloak();

    console.log(keycloak)

    useEffect(() => {
        if (keycloak && initialized && !keycloak.authenticated) {
            console.log(keycloak)
            keycloak.login();
        } else {
            console.log("authenticated")
            console.log(keycloak)
        }
    }, [keycloak?.authenticated, initialized]);

    const [tessera, setTessera] = useState('');
    // const [sezione, setSezione] = useState('');
    const [result, setResult] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const search = (ev) => {
        ev.preventDefault();
        let match = null;
        if (tessera) {
            match = data.filter(x => x.tessera == tessera);
        }
        // else if (sezione) {
        //     match = data.filter(x => x.sezione.toLowerCase().startsWith(sezione.toLowerCase()))
        // }
        else {
            return;
        }

        if (!match.length) {
            setNotFound(true);
            setResult([]);
        } else {
            setTessera('');
            // setSezione('')
            setNotFound(false);
            setResult(match);
        }
    }

    if (!keycloak.authenticated) {
        return <p></p>
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Inserisci la tua tessera e ti dir&ograve; dove dormire<br />
                    OdP Branca L
                </p>
            </header>
            <form onSubmit={search}>
                <input
                    placeholder={'Tessera'}
                    onChange={(e) => setTessera(e.target.value)}
                    value={tessera}
                />
                <button type={'submit'}>Cerca</button>
            </form>
            {notFound &&
                <p>Nessun risultato! Ricontrolla i tuoi dati, altrimenti
                    contatta la segreteria</p>}
            {result.length > 0 && (
                <table>
                    {result.map(x => (
                        <>
                            <tr>
                                <th>Sezione</th>
                                <th>Tessera</th>
                                <th>Nome</th>
                            </tr>
                            <tr>
                                <td>{x.sezione}</td>
                                <td>{x.tessera}</td>
                                <td>{x.nome}</td>
                            </tr>
                            <tr>
                                <th>Alloggio</th>
                                <th>Stanza</th>
                            </tr>
                            <tr>
                                <td>{x.alloggio}</td>
                                <td>{x.stanza}</td>
                            </tr>
                        </>
                    )
                    )}
                </table>
            )}
        </div>
    );
}


export default App;
