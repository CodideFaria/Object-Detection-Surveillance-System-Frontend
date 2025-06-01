import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { networkAdapter } from "../../network/NetworkAdapter";

export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successLink, setSuccessLink] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isChecked) {
            setError('You must agree to the Terms and Conditions.');
            setSuccessMessage("");
            setSuccessLink("");
            return;
        }
        setError("");

        try {
            const response = await networkAdapter.post('/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });

            if (response.status !== 'success') {
                setError(response.message);
                setSuccessMessage("");
                setSuccessLink("");
            } else {
                // clear form state
                setError("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setIsChecked(false);

                // handle different response types
                const data = response.data;
                if (typeof data === 'string') {
                    setSuccessMessage(data);
                    setSuccessLink("");
                } else if (typeof data === 'object') {
                    setSuccessMessage(data.message || '');
                    setSuccessLink(data.link || '');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again later.');
            setSuccessMessage("");
            setSuccessLink("");
        }
    };

    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
            <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeftIcon className="size-5" />
                    Back to dashboard
                </Link>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Sign Up
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your name, email and password to sign up!
                        </p>
                    </div>
                    <div>
                        {error && (
                            <p className="mb-4 text-sm text-red-500">{error}</p>
                        )}
                        {successMessage && (
                            <p className="mb-4 text-sm text-green-500">{successMessage}</p>
                        )}
                        {successLink && (
                            <div className="mb-4">
                                <a
                                    href={successLink}
                                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Continue
                                </a>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <Label>
                                            First Name<span className="text-error-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="fname"
                                            name="fname"
                                            placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Label>
                                            Last Name<span className="text-error-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="lname"
                                            name="lname"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>
                                        Email<span className="text-error-500">*</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>
                                        Password<span className="text-error-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            placeholder="Enter your password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        className="w-5 h-5"
                                        checked={isChecked}
                                        onChange={setIsChecked}
                                    />
                                    <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                                        By creating an account you agree to the{' '}
                                        <span className="text-gray-800 dark:text-white/90">
                                            Terms and Conditions,
                                        </span>{' '}
                                        and our{' '}
                                        <span className="text-gray-800 dark:text-white">
                                            Privacy Policy
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                Already have an account?{' '}
                                <Link
                                    to="/signin"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
