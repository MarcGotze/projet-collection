import React from 'react';

const UserLog = () => {
    return (
        <div>
            <form>
                <label htmlFor="userName">
                    Login :
                </label>
                <input type="text" name="userName"/>
                <label htmlFor="userPassword">
                    Password :
                </label>
                <input type="text" name="userPassword"/>
                <input type="submit" name="submit" value ="Se connecter"/>
            </form>
        </div>
    );
};

export default UserLog;