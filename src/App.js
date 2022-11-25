import logo from './logo.svg';
import './App.css';
import {useState} from "react";

const data = require('./anaz.json');

function App() {
    const [tessera, setTessera] = useState('');
    const [sezione, setSezione] = useState('');
    const [result, setResult] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const search = (ev) => {
        ev.preventDefault();
        let match = null;
        if (tessera) {
            match = data.filter(x => x.tessera == tessera);
        } else if (sezione) {
            match = data.filter(x => x.sezione.toLowerCase().startsWith(sezione.toLowerCase()))
        } else {
            return;
        }

        if (!match.length) {
            setNotFound(true);
            setResult([]);
        } else {
            setTessera('');
            setSezione('')
            setNotFound(false);
            setResult(match);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Inserisci la tua tessera o la sezione e ti dir&ograve; dove dormire<br/>
                    ANaz Novembre 2022
                </p>
            </header>
            <form onSubmit={search}>
                <input
                    placeholder={'Tessera'}
                    onChange={(e) => setTessera(e.target.value)}
                    value={tessera}
                />
                <input
                    placeholder={'Sezione'}
                    onChange={(e) => setSezione(e.target.value)}
                    value={sezione}
                />
                <button type={'submit'}>Cerca</button>
            </form>
            {notFound &&
                <p>Nessun risultato! Se hai cercato per sezione, prova a usare la tessera o viceversa, altrimenti
                    contatta la segreteria</p>}
            {result.length > 0 && (
                <table>
                    {result.map(x => (
                            <>
                                <tr>
                                    <th>Sezione</th>
                                    <th>Tessera</th>
                                    <th>Nome</th>
                                    <th>Tipo stanza</th>
                                </tr>
                                <tr>
                                    <td>{x.sezione}</td>
                                    <td>{x.tessera}</td>
                                    <td>{x.nome}</td>
                                    <td>{x.tipoStanza}</td>
                                </tr>
                                <tr>
                                    <th>Stanza</th>
                                    <th>Piano</th>
                                    <th>Corridoio</th>
                                </tr>
                                <tr>
                                    <td>{x.stanza}</td>
                                    <td>{x.piano}</td>
                                    <td>{x.corridoio}</td>
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
