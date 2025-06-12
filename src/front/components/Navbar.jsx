import { Link } from "react-router-dom";
import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {

	const { user, logout } = useAuth();

	return (
		<>

			<nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-lg">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1 fw-bold">Auth Context Excercise</span>
					</Link>
					<div className="d-flex justify-content-evenly">
						<button
							type="button"
							className="btn btn-outline-light me-2"
							data-bs-toggle="modal"
							data-bs-target="#registerModal"
						>
							Sign Up
						</button>
						{!user ? (
							<button
								type="button"
								className="btn btn-outline-light"
								data-bs-toggle="modal"
								data-bs-target="#loginModal"
							>
								Login
							</button>) : (
							<button
								type="button"
								className="btn btn-danger"
								onClick={logout}
							>
								Logout
							</button>
						)}
					</div>
				</div>
			</nav>



			<div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark text-light border-0 shadow-lg">
						<div className="modal-header border-0">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Register</h1>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<RegisterModal />
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark text-light border-0 shadow-lg">
						<div className="modal-header border-0">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<LoginModal />
						</div>
					</div>
				</div>
			</div>
		</>



	);
};