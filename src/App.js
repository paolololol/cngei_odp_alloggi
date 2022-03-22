import logo from './logo.svg';
import './App.css';
import {useState} from "react";

const data = require('./odp.json');

function App() {
    const [tessera, setTessera] = useState('');
    const [cognome, setCognome] = useState('');
    const [result, setResult] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const search = (ev) => {
        ev.preventDefault();
        let match = null;
        if (tessera) {
            match = data.filter(x => x.tessera == tessera);
        } else if (cognome) {
            match = data.filter(x => x.nome.toLowerCase().startsWith(cognome.toLowerCase()))
        } else {
            return;
        }

        if (!match.length) {
            setNotFound(true);
            setResult([]);
        } else {
            setTessera('');
            setCognome('')
            setResult(match);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Inserisci la tua tessera o il cognome e ti dir&ograve; dove dormire
                </p>
            </header>
            <form onSubmit={search}>
                <input
                    placeholder={'Tessera'}
                    onChange={(e) => setTessera(e.target.value)}
                    value={tessera}
                />
                <input
                    placeholder={'Cognome'}
                    onChange={(e) => setCognome(e.target.value)}
                    value={cognome}
                />
                <button type={'submit'}>Cerca</button>
            </form>
            {notFound &&
                <p>Nessun risultato! Se hai cercato per cognome, prova a usare la tessera o viceversa, altrimenti
                    contatta la segreteria</p>}
            {result.length > 1 &&
                <p>Ci sono pi&ugrave; risultati, prova ad aggiungere il nome o cerca usando la tessera</p>}
            {result.length === 1 && (
                <div className={'result-container'}>
                    <div className={'result-item'}>
                        <div>Sezione</div>
                        <div>{result[0].sezione}</div>
                    </div>
                    <div className={'result-item'}>
                        <div>Tessera</div>
                        <div>{result[0].tessera}</div>
                    </div>
                    <div className={'result-item'}>
                        <div>Nome</div>
                        <div>{result[0].nome}</div>
                    </div>
                    <div className={'result-item'}>
                        <div>Tipo alloggio</div>
                        <div>{result[0].tipoalloggio}</div>
                    </div>
                    <div className={'result-item'}>
                        <div>Hotel</div>
                        <div>{result[0].HOTEL}</div>
                    </div>
                    <div className={'result-item'}>
                        <div>Stanza</div>
                        <div>{result[0]["N stanza"]}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
