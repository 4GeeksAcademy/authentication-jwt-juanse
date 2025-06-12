import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export const LoginModal = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { login } = useAuth();

    const onSubmit = (data) => {
        login(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-dark text-light p-4 rounded shadow-lg">
            <div className="form-group mb-3">
                <label>Username</label>
                <input type="text" className="form-control bg-secondary bg-opacity-75 text-light border-0"
                    {...register("username", { required: 'The username is required' })}
                />
                {errors.username && <p className="text-warning mt-1">{errors.username.message}</p>}
            </div>
            <div className="form-group mb-3">
                <label>Password</label>
                <input type="password" className="form-control bg-secondary bg-opacity-75 text-light border-0"
                    {...register("password", { required: 'The password is required' })}
                />
                {errors.password && <p className="text-warning mt-1">{errors.password.message}</p>}
            </div>
            <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary">Login</button>
            </div>
        </form>
    )
}