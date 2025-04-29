import { getCookie } from "../utils/Functions";


function UserGreeting() {
 
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
<button onClick={() => window.open("/account?data=profileinfo", "_self")}
                      
                    className="UserGreeting"
    >
                        Hi, {userName}
                    </button>
               
                </>
            )}
        </>
    );
}


export default UserGreeting;