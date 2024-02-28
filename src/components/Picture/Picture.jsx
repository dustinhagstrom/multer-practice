import { useState, useRef } from "react";
import axios from "axios";

export default function Picture() {
    const [file, setFile] = useState(undefined);
    const [image, setImage] = useState(undefined); // this holds a url to display image on the DOM before submitting to the database

    const fileInput = useRef(null);

    const handleSubmitPic = (e) => {
        e.preventDefault();
        console.log("hit submit button");
        console.log("file:", file);
        let data = new FormData();
        data.append("image_to_upload", file);
        axios.post("/api/pics", data)
        .then((res) => {
            console.log(res);
            // the submittal to the DB was a success
            // make api call if desired to match server state
            // then update reducer with new state returned
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handlePicOnChange = () => {
        if (fileInput.current.files.length !== 0) {
            setFile(fileInput.current.files[0]);
            setImage(URL.createObjectURL(fileInput.current.files[0]));
        }
    };

    // function arrayBufferToBase64(buffer) {
    //     //convert the buffer to base64
    //     let binary = "";
    //     let bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => (binary += String.fromCharCode(b)));
    //     return window.btoa(binary);
    //   }

    const fetchPicFromDB = () => {
        axios.get("/api/pics")
        .then((res) => {
            // navigate through res to get binary data
            console.log(res);
            // maybe throw binary as input to arrayBufferToBase64

            // so maybe do something like the following:

            // let OurPic = arrayBufferToBase64(res.data.payload.img.data.data);
            // let OurPicSrc = `data:image/png;base64,${OurPic}`;
            // console.log(res.data.foundPlayer);
            // setFile(undefined);
            // setImage(undefined);
            // setProfileImg(OurPicSrc);
            // setIsButtonDisabled(true);
            // setUserID(res.data.foundPlayer);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <h1>picture component</h1>
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
        </>
    );
}
