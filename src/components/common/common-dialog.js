import React, { useEffect, useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';

const CommonDialog = ({ isVisible, message, header, doAccept, onHide }) => {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    const handleHide = () => {
        setVisible(false);
        if (onHide) onHide();
    };

    return (
        <ConfirmDialog 
            visible={visible} 
            icon="pi pi-exclamation-triangle" 
            message={message} 
            header={header} 
            accept={doAccept} 
            reject={handleHide} 
            onHide={handleHide}
        />
    );
};

export default CommonDialog;
