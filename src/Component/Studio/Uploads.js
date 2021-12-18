import React, { useState } from 'react';
import './Css/Uploads.css';
import './Css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ReactTagInput from "@pathofdev/react-tag-input";

/* ----------- import css ----------- */
import 'react-toastify/dist/ReactToastify.css';
import "@pathofdev/react-tag-input/build/index.css";

function Uploads() {

    const history = useHistory();

    const user = useSelector((state) => state.user);
    const userChannel = useSelector((state) => state.userChannel);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [videoFileName, setVideoFileName] = useState('No file chosen');
    const [thumbnailFileName, setThumbnailFileName] = useState('No file chosen');
    const [videoName, setVideoName] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [tags, setTags] = useState([]);
    const [uploadedPercentage, setUploadedPercentage] = useState(0);

    function uploadVideo() {
        document.getElementById("selectVideo").click()
    }

    function uploadThumbnail() {
        document.getElementById("selectThumbnail").click()
    }

    function routeChange(path) {
        history.push(path);
    }

    function displayAlert(type, alertMsg) {
        if (type == true) {
            toast.success(alertMsg, {
                position: "top-center"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-center"
            })
        }
    }

    function maxSelectFile(event) {
        let files = event.target.files;
        if (files.length > 1) {
            toast.error('Maximum 1 file is allowed');
            event.target.value = null;
            return false;
        }
        return true;
    }

    function fileChangeHandler(event) {
        const file = event.target.files[0];
        if (file != null) {
            const fileType = file.type.substr(0, 5);

            if (fileType === "video") {
                if (maxSelectFile(event)) {
                    setSelectedVideo(file);
                    setVideoFileName(file.name);
                }
            } else {
                if (maxSelectFile(event)) {
                    setSelectedThumbnail(file);
                    setThumbnailFileName(file.name);
                }
            }
        }
    }

    async function fileUploadHandler(event) {

        const formData = new FormData();

        formData.append("user_id", user._id);
        formData.append("channel_id", userChannel._id);
        formData.append("file", selectedVideo);
        formData.append("file", selectedThumbnail);
        formData.append("videoName", videoName);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("visibility", visibility);
        formData.append("tags", tags);

        const progress = {
            onUploadProgress: ProgressEvent => {
                const { loaded, total } = ProgressEvent;
                let percent = Math.floor(loaded * 100 / total);
                console.log(`${loaded} kb of ${total}  |  ${percent}%`);

                if (percent < 100) {
                    setUploadedPercentage(percent);
                }
            }
        }


        const data = await axios.post('http://localhost:3000/uploadVideo', formData, progress).then(res => {
            setUploadedPercentage(100);
            setTimeout(() => {
                setUploadedPercentage(0);
            }, 1000);
            return res.data
        }).catch((error) => {
            return error
        });
        displayAlert(data.status, data.msg);
        setTimeout(() => {
            routeChange('/studio');
        }, 1000);
    }

    return (
        <>
            <div className="uploader-container">
                <h4>Upload Video</h4>
                <hr className="my-4" />
                <div className="row">
                    <div className="form-group files col-6">
                        <label>Upload Your Video Here</label>
                        <button className="input-btn" onClick={() => uploadVideo()}>
                            <p className="file-name">{videoFileName}</p>
                        </button>
                        <input
                            id="selectVideo"
                            hidden
                            type="file"
                            name="videoFile"
                            className="form-control"
                            multiple="multiple"
                            accept="video/*"
                            autocomplete="off"
                            onChange={(e) => fileChangeHandler(e)}
                        />
                    </div>
                    <div className="form-group files col-6">
                        <label>Upload Your Thumbnail Image Here</label>
                        <button className="input-btn" onClick={() => uploadThumbnail()}>
                            <p className="file-name">{thumbnailFileName}</p>
                        </button>
                        <input
                            id="selectThumbnail"
                            hidden
                            type="file"
                            name="thumbnailFile"
                            className="form-control"
                            multiple="multiple"
                            accept="image/*"
                            autocomplete="off"
                            onChange={(e) => fileChangeHandler(e)}
                        />
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    <div className="form-group col-12">
                        <input
                            className="input"
                            type="text"
                            name="videoName"
                            autocomplete="off"
                            placeholder="Title"
                            onChange={(e) => { setVideoName(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <textarea
                            className="text-area"
                            name="description"
                            rows="7"
                            autocomplete="off"
                            placeholder="Description..."
                            onChange={(e) => { setDescription(e.target.value) }}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input
                            className="input"
                            list="category-list"
                            id="category"
                            name="category"
                            autocomplete="off"
                            placeholder="Category"
                            onChange={(e) => { setCategory(e.target.value) }}
                        />
                        <datalist id="category-list">
                            <option value="Art">Art</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Motivation">Motivation</option>
                            <option value="Others">Others</option>
                            <option value="Science">Science</option>
                        </datalist>
                    </div>
                    <div className="form-group col-6">
                        <input
                            className="input"
                            list="visibility-list"
                            id="visibility"
                            name="visibility"
                            autocomplete="off"
                            placeholder="Visibility"
                            onChange={(e) => { setVisibility(e.target.value) }}
                        />
                        <datalist id="visibility-list">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </datalist>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ReactTagInput
                            allowUnique={true}
                            tags={tags}
                            value={tags}
                            onChange={(newTags) => setTags(newTags)}
                            placeholder="# Add tags...  (Type and press enter)"
                        />
                    </div>
                </div>
                <div>
                    {uploadedPercentage > 0 && <ProgressBar now={uploadedPercentage} animated label={` Uploading... ${uploadedPercentage} %`} className="my-4" />}
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary float-right mt-5"
                        disabled={selectedVideo == null || selectedThumbnail == null || videoFileName == null || description == null}
                        onClick={() => fileUploadHandler()}
                    > Upload Video
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Uploads;