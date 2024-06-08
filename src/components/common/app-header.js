import { Link } from 'react-router-dom';
import { Menubar  } from 'primereact/menubar';

const AppHeader = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            template: (item, options) => {
                return (
                    <Link to="/home" className={options.className}>
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

    return (
        <>
            <Menubar model={items} />
        </>
    )
}

export default AppHeader;