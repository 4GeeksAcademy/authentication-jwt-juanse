import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export const RegisterModal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { registerUser } = useAuth();

    const onSubmit = (data) => {
        registerUser(data)
    }

    const password = watch("password");

    return <form onSubmit={handleSubmit(onSubmit)} className="bg-dark text-light p-4 rounded shadow-lg">
        <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" className="form-control bg-secondary bg-opacity-75 text-light border-0"
                {...register("email", { required: 'The email is required' })}
            />
            {errors.email && <p className="text-warning mt-1">{errors.email.message}</p>}
        </div>

        <div className="form-group mb-3">
            <label>Username</label>
            <input type="text" className="form-control bg-secondary bg-opacity-75 text-light border-0"
                {...register("username", { required: 'The Username is required' })}
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

        <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control bg-secondary bg-opacity-75 text-light border-0"
                {...register("confirmPassword", {
                    required: 'Confirm you password is required',
                    validate: value => value === password || "The passwords doesn't match"
                })}
            />
            {errors.confirmPassword && <p className="text-warning mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
    </form>;
};
