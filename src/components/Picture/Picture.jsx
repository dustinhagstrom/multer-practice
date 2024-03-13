import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Picture() {
    const [file, setFile] = useState(undefined);
    const [imagePreview, setImagePreview] = useState(undefined);
    const [profileImg, setProfileImg] = useState(undefined);

    const fileInput = useRef(null);

    const handleSubmitPic = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append("image_to_upload", file);
        
        axios
            .post("/api/pics", data)
            .then((res) => {
                // make api call to match server state
               fetchPicFromDB();

                // remove the preview of image from DOM
                setImagePreview(undefined);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePicOnChange = () => {
        if (fileInput.current.files.length !== 0) {
            setFile(fileInput.current.files[0]);
            setImagePreview(URL.createObjectURL(fileInput.current.files[0]));
        }
    };

    //convert the buffer to base64
    function arrayBufferToBase64(buffer) {
        let binary = "";
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }

    const fetchPicFromDB = () => {
        axios
            .get("/api/pics/1")
            .then((res) => {
                // navigate through res to get binary data
                // and convert binary to arrayBufferToBase64

                let OurPic = arrayBufferToBase64(res.data[0].data.data);
                let OurPicSrc = `data:image/*;base64,${OurPic}`;
                setFile(undefined);
                setImagePreview(undefined);
                setProfileImg(OurPicSrc);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchPicFromDB();
    }, []);
    return (
        <>
            <h1>picture component</h1>
            <img src={profileImg} alt="This is where the profile img goes" />
            <form onSubmit={(e) => handleSubmitPic(e)}>
                <label htmlFor="file-upload">Upload your photo:</label>
                <input
                    id="file-upload"
                    name="image_to_upload"
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={handlePicOnChange}
                />
                <input type="submit" value="upload pic button" />
            </form>
            <p>Below is a preview of the image before sending to the DB</p>
            {imagePreview && (
                <img
                    src={imagePreview}
                    alt="We have a preview of the image we selected for uploading to the DB here"
                />
            )}
        </>
    );
}
