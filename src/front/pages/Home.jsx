import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
	const { user } = useAuth();
	return (
		<div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-light">
			<div className="row w-100 justify-content-center">
				<div className="col-12 d-flex flex-column align-items-center justify-content-center">
					{!user ? (
						<div className="text-center p-5 rounded bg-secondary bg-opacity-75 shadow-lg">
							<h1 className="display-4 fw-bold mb-3">No user</h1>
							<p className="lead">
								Por favor inicia sesión o regístrate para continuar.
							</p>
						</div>
					) : (
						<div className="text-center p-5 rounded bg-secondary bg-opacity-75 shadow-lg">
							<h1 className="display-4 fw-bold mb-3">
								Bienvenido, {user.username}!
							</h1>
							<p className="lead">Has iniciado sesión correctamente.</p>
							<Link to="/private">
								<button className="btn btn-primary">Ir a la ruta privada</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
