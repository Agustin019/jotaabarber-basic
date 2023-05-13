import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';

export default function NavbarDropdown({ showDropdown, handleDropdownToggle }) {
    const auth = useAuth()
    const { datosUsuarioActual, logOut, setDatosUsuarioActual } = auth
    const navigate = useNavigate()

    return (
        <div className="relative mr-20">
            <button className="link  py-2 rounded inline-flex items-center " onClick={handleDropdownToggle}>
                <span className="link mr-1">{datosUsuarioActual?.fullName?.split(' ')[0]}</span>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 14l-5-5 1.41-1.41L10 11.17l3.59-3.58L15 9l-5 5z" /></svg>
            </button>
            <ul className={`${showDropdown ? "block" : "hidden"} absolute  pr-5 `}>
                <li className="block  bg-gray-700 hover:bg-gray-400 p-2 w-40 link"><a href="#!" className=" no-underline">Perfil</a></li>
                <li
                    onClick={() => {
                        logOut()
                        setDatosUsuarioActual({})
                        navigate('/micuenta')
                    }}
                    className="block  bg-gray-700 hover:bg-gray-400 p-2 w-40"><a href="#!" className=" no-underline">
                        Cerrar cesión
                    </a>
                </li>
            </ul>
        </div>
    );
}


