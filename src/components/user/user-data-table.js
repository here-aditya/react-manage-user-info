import { useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UserDataTable = () => {
    const userData = useSelector(state => state.personalData);

    const addressTemplate = (rowData) => {
        return (
            <>
                {rowData.addresses.length > 0 && rowData.addresses.map((address, index) => (
                    <div key={index} className="mb-3">
                        <div><strong>Street:</strong> {address.street}</div>
                        <div><strong>City:</strong> {address.city}</div>
                        <div><strong>State:</strong> {address.state}</div>
                        <div><strong>Postal Code:</strong> {address.postalCode}</div>
                        <div><strong>Country:</strong> {address.country}</div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="p-datatable-wrapper border-solid mt-3 p-2">
                <p><b>Show User Data Table :</b></p>
                <DataTable stripedRows value={[userData]} responsiveLayout="scroll" emptyMessage="No data available">
                    <Column field="firstName" header="First Name"></Column>
                    <Column field="lastName" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column field="dob" header="Date of Birth" body={(rowData) => rowData.dob && new Date(rowData.dob).toLocaleDateString()}></Column>
                    <Column field="gender" header="Gender"></Column>
                    <Column header="Addresses" body={addressTemplate}></Column>
                </DataTable>
        </div>
    );
}

export default UserDataTable;