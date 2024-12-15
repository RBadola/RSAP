import React, { useRef, useState } from 'react'
import { IoCloudUpload } from 'react-icons/io5'
import User from "../assets/images.png"
import convertTo64 from '../../utils/converToBase64'
import { twMerge } from 'tailwind-merge'
const RegisterPage = () => {
    const photoRef = useRef(null)
    const imgRef = useRef(null)
    const [backendErr, setbackendErr] = useState("")
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        photo: "",
    })
    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        phoneError: false,
        backendError: false
    })
    const changeHandler = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            let formValid = true;
            if (!values.name.trim()) {
                setErrors(prev => ({ ...prev, nameError: true }));
                formValid = false;
            }
            if (!values.email.trim()) {
                setErrors(prev => ({ ...prev, emailError: true }));
                formValid = false;
            }
            if (!values.phone.trim()) {
                setErrors(prev => ({ ...prev, phoneError: true }));
                formValid = false;
            }
            if (!formValid) return;
            const payload = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                photoBase64: values.photo,
            }
            console.log(payload)
            const response = await fetch("http://localhost:3000/user/", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await response.json()
            setErrors(prev => ({ ...prev, backendError: true }));
            setbackendErr(data.error)
            if (!data.error) {
                setValues({
                    name: "",
                    email: "",
                    phone: "",
                    photo: ""
                })
                imgRef.current.src = User
            }
            console.log(data.error)
        } catch (err) {
            console.log(err)
        }
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!validImageTypes.includes(file.type)) {
            alert("Please select a valid image file (JPEG, PNG, or WEBP)");
            return;
        }
        if (imgRef.current) {
            imgRef.current.src = URL.createObjectURL(file);
        }
        console.log(file)
        await convertTo64(e).then(val => setValues((prev) => ({ ...prev, photo: val })))
    };

    return (
        <div className=' p-5 rounded-md bg-gray-400 w-4/5 md:w-2/5 lg:w-3/12      bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100'>
            <form onSubmit={handlesubmit} className='grid grid-cols-1 gap-y-5 items-center justify-center w-full'>
                <div className='w-full'>
                    {/* <label htmlFor='photo' className='w-full'>Profile</label> */}
                    <button
                    type='button'
                        onClick={() => photoRef.current.click()}
                        className=" p-5  rounded flex items-center justify-center mx-auto w-full flex-col gap-2 relative  transition-all"
                    >
                        <img
                            src={User}
                            ref={imgRef}
                            alt="user profile"
                            className="w-3/5 aspect-square rounded-full object-cover"
                        />
                        <span className="absolute text-gray-300 hover:text-white">
                            <IoCloudUpload size={30}  />
                        </span>
                        <p className="text-sm text-gray-500">Click to choose a picture</p>
                    </button>

                    <input ref={photoRef} name="photo" onChange={handleImage} type='file' accept="image/*" id='photo' className='p-2 rounded hidden' />
                </div>
                <div>
                    <label htmlFor="name" className="">Name{" "} <sup className='text-red-500'>*</sup></label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        id="name"
                        placeholder="John Doe"
                        onChange={(e) => {
                            const value = e.target?.value;
                            const regex = /^[a-zA-Z ]*$/;
                            if (regex.test(value)) {
                                changeHandler(e);
                            }
                        }}
                        className={twMerge("p-2 rounded w-full")} />
                    <p className={twMerge("hidden", errors.nameError && "text-red-500 block ")} >Name is required</p>
                </div>
                <div>
                    <label htmlFor='email'>Email {" "} <sup className='text-red-500'>*</sup></label>
                    <input name="email" type='email'
                        value={values.email}
                        onChange={changeHandler}
                        placeholder='jhondoe@gmail.com' id='email' className={twMerge("p-2 rounded w-full")}
                    />
                    <p className={twMerge("hidden", errors.nameError && "text-red-500 block ")} >Email is required</p>
                </div>
                <div>
                    <label htmlFor='phone'>Phone{" "}<sup className='text-red-500'>*</sup></label>
                    <input type='tel' name='phone'
                        placeholder='+91-00000-00000'
                        value={values.phone}
                        id='phone'
                        onChange={
                            (e) => {
                                const regex = /^[0-9]*$/;
                                const value = e.target?.value;
                                if (!regex.test(value)) {
                                    return
                                } else if (value.length <= 10) {
                                    changeHandler(e)
                                } else {
                                    return
                                }
                            }}
                        className={twMerge("p-2 rounded w-full")}
                    />
                    <p className={twMerge("hidden", errors.nameError && "text-red-500 block ")} >Phone is required</p>
                </div>
                <div>
                    <p className={twMerge("hidden", errors.backendError && "text-red-500 block ")} >{backendErr}</p>
                </div>
                <button type='submit' className='p-2 text-xl bg-white shadow rounded font-bold mx-auto w-full hover:bg-gray-200'
                    onMouseDown={e => (e.target.style.scale = 0.8)}
                    onMouseUp={e => (e.target.style.scale = 1)} >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage