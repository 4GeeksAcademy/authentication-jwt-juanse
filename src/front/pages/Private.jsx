import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Private = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            alert('You are not a User');
            navigate('/');
        }
    }, [user, loading, navigate]);

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center p-5 rounded bg-secondary bg-opacity-75 shadow-lg">
                        <h1 className="display-4 fw-bold mb-3">Ruta Privada</h1>
                        <p className="lead">¡Bienvenido a la sección privada!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}