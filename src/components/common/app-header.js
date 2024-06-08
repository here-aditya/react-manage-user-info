import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            template: (item, options) => {
                return (
                    <Link to="/" className={options.className}>
                        <i className={`mr-1 ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </Link>
                );
            }
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-server',
            template: (item, options) => {
                return (
                    <Link to="/dashboard" className={options.className}>
                        <i className={`mr-1 ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </Link>
                );
            }
        }
    ];

    const doLogout = () => {
        return
    }

    const end = (
        <>
            <Button size="small" label="Login" icon="pi pi-sign-in" className="p-button-outlined" onClick={() => navigate('/login')} />
            <Button size="small" label="Logout" icon="pi pi-power-off" className="p-button-outlined" onClick={doLogout} />
        </>
    );

    return (
        <>
            <Menubar model={items} end={end} />
        </>
    )
}

export default AppHeader;