import styled from "styled-components";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function ProtectedRoutes({ children }) {

    const navigate = useNavigate();

    // 1. Load the authenticated user

    const {isLoading, isAuthenticated} = useUser();


    // 2. If there is no user, redirect to the login page
    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    // 3. While loading, show a spinner
    if(isLoading) 
        return (
                <FullPage>
                   <Spinner />
                </FullPage>);

    

    // 4. If there is a user render the app

    if(isAuthenticated) return children;
   
}
