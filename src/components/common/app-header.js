import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux-toolkit/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import CommonDialog from './common-dialog';
import { useState } from 'react';

const AppHeader = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const showDialog = () => {
        setDialogVisible(true);
    };
    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleAccept = () => {
        hideDialog();
        dispatch(logout())
    };

    const end = (
        <>
            {!user ?
                <Button size="small" label="Login" icon="pi pi-sign-in" className="p-button-outlined" onClick={() => navigate('/login')} /> :
                <Button size="small" label="Logout" icon="pi pi-power-off" className="p-button-outlined" onClick={showDialog} />
            }
            <CommonDialog 
                isVisible={dialogVisible} 
                message="Do you want to logout?" 
                header="Logout Confirmation" 
                doAccept={handleAccept} 
                onHide={hideDialog}
            />
        </>
    );

    return (
        <>
            <Menubar model={items} end={end} />
        </>
    )
}

export default AppHeader;