import {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    useEffect(()=> {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[])

    const login = async (data) => {
        try {
            const response = await fetch(`${backendUrl}/api/login`,
                {
                  method: 'POST',
                  headers:{
                    'Content-Type':'application/json'
                  },
                   body:JSON.stringify(data)
                }
            )
        const response_data = await response.json();
        if (response.ok){
            sessionStorage.setItem('jwt-token', response_data.token);
            sessionStorage.setItem('user', JSON.stringify(response_data.user));
            setUser(response_data.user)
            alert(data.msg || 'Succesfull Login')
        }else{
            alert(data.msg || 'Login error')
        }
        } catch (error) {
            alert('Network Error')
        }       
    }

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('jwt-token');
        sessionStorage.removeItem('user');
    }

    const registerUser = async (data) => {
        try {
            const response = await fetch(`${backendUrl}/api/register`,
                {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
            const response_data = await response.json();
            console.log(data)
            if(response.ok){
                alert('Successfully registered user')
            }
            else{
                alert('There was an error in register please try again')
            }
        } catch (error) {
            console.log(error)
            alert('Network error')
        }
    }

    return(
    <AuthContext.Provider value={{user,login,logout,loading, registerUser}}>
        {children}
    </AuthContext.Provider>
)
};

