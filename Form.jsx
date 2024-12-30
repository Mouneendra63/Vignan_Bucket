// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Form() {
//     const [data, setData] = useState({
//         desc: '',
//         images: null,
//         page: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         setData((prevState) => ({
//             ...prevState,
//             images: e.target.files[0],
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(data);
//         const formData = new FormData();
//         formData.append("desc", data.desc);
//         formData.append("page", data.page);
//         if (data.images) {
//             formData.append("image", data.images);
//         }

//         try {
//             const response = await axios.post("http://localhost:8000/uploads", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             console.log("Server Response:", response.data);
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     return (
//         <div className="container my-5">
//             <h1 className="text-primary text-center mb-4">Event Details</h1>
//             <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
//                 <div className="mb-3">
//                     <label htmlFor="desc" className="form-label fs-5">Event Description</label>
//                     <textarea
//                         name="desc"
//                         id="desc"
//                         className="form-control"
//                         placeholder="Enter description on page"
//                         value={data.desc}
//                         onChange={handleInputChange}
//                     ></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="pages" className="form-label fs-5">Select Page</label>
//                     <select
//                         name="page"
//                         id="pages"
//                         className="form-select"
//                         value={data.page}
//                         onChange={handleInputChange}
//                     >
//                         <option value="">Select An Option</option>
//                         <option value="highlights">Highlights</option>
//                         <option value="past-highlights">Past Highlights</option>
//                         <option value="upcoming">Upcoming</option>
//                         <option value="past">Webinars</option>
//                     </select>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="image" className="form-label fs-5">Images</label>
//                     <input
//                         type="file"
//                         name="image"
//                         id="image"
//                         className={data.page === "upcoming" || data.page === "highlights" ?"form-control text-primary":"form-control"}
//                         onChange={handleFileChange}
//                         disabled={data.page === "upcoming" || data.page === "highlights"}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-danger w-100">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Form;


import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form() {
    const [data, setData] = useState({
        desc: '',
        images: null,
        page: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            images: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const formData = new FormData();
        formData.append("desc", data.desc);
        formData.append("page", data.page);
        if (data.images) {
            formData.append("image", data.images);
        }

        try {
            const response = await axios.post("http://localhost:8000/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Server Response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-primary text-center mb-4">Event Details</h1>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label fs-5">Event Description</label>
                    <textarea
                        name="desc"
                        id="desc"
                        className="form-control"
                        placeholder="Enter description"
                        value={data.desc}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="pages" className="form-label fs-5">Select Page</label>
                    <select
                        name="page"
                        id="pages"
                        className="form-select"
                        value={data.page}
                        onChange={handleInputChange}
                    >
                        <option value="">Select An Option</option>
                        <option value="highlights">Highlights</option>
                        <option value="pastevents">Past Highlights</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="webinar">Webinars</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label fs-5">Images</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                        onChange={handleFileChange}
                        disabled={data.page === "upcoming"}
                    />
                </div>
                <button type="submit" className="btn btn-danger w-100">Submit</button>
            </form>
        </div>
    );
}

export default Form;