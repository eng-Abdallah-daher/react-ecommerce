import { useState } from "react";
import { getCookie } from "../utils/Functions";
import ConfirmDialog from "./ConfirmDialog";
import { logout } from "../utils/loginFunctions";

function UserGreeting() {
    const [showConfirm, setShowConfirm] = useState(false);
    const userName = getCookie('userName');
    console.log(userName);


    return (
        <>
            {userName.length === 0 ? (
                <i
                    tabIndex="0"
                    onClick={() => {
                        window.open("/login", "_self");
                    }}
                >
                    👤
                </i>
            ) : (
                <>
                    <p
                        style={{ display: 'inline', margin: '0 3px' ,cursor:'pointer'}}
                        onClick={() => setShowConfirm(true)}
                    >
                        Hi, {userName}
                    </p>
                    <ConfirmDialog
                        message="Do you want to log out?"
                        onConfirm={logout}
                        title="Log out"
                        onCancel={() => setShowConfirm(false)}
                        show={showConfirm}
                    />
                </>
            )}
        </>
    );
}


export default UserGreeting;